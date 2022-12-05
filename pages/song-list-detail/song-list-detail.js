// pages/song-list-detail/song-list-detail.js
import { getMoreSongTag, getSongList } from '../../services/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreSongs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchMoreSongTag()
  },

  // 网络请求
  async fetchMoreSongTag() {
    const res = await getMoreSongTag()
    const tags = res.tags
    const promises = []
    for (const tag of tags) {
      const promise = getSongList(tag.name)
      promises.push(promise)
    }
    Promise.all(promises).then(res => {
      console.log(res);
      this.setData({moreSongs:res})
    })
  },

  

  
})