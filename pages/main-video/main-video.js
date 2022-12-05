import {getMvTopList} from "../../services/video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频列表
    videoList:[],
    offset:0,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTopMv()
  },
  // 网络请求
  async fetchTopMv() {
    // 请求数据
    const res = await getMvTopList(this.data.offset)
    // 合并新的数据
    const newVideo = [...this.data.videoList, ...res.data]
    console.log(res);
    wx.hideLoading()
    // 设置数据
    this.setData({
      videoList:newVideo,
      hasMore:res.hasMore
    })
    this.data.offset = this.data.videoList.length
  },
  // 上拉加载更多
  onReachBottom() {
    console.log('上拉');
    if(!this.data.hasMore) return
    this.fetchTopMv(this.data.videoList.length)
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉');
    this.setData({
      videoList:[],
      hasMore:true,
      offset:0
    })
   
    this.fetchTopMv().then(() => {
      wx.stopPullDownRefresh()
    })

  }
})