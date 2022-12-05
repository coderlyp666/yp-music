// pages/detail-video/detail-video.js
import { getMvDetail, getMvDetailInfo ,getMvRecommend } from "../../services/video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求id
    id:0,
    // 视频地址
    mvUrl:'',
    // 弹幕
    danmuList: [
        {
        text: '好听',
        color: '#ff0000',
        time: 1
        }, 
        {
          text: '爱了爱了',
          color: '#ff00ff',
          time: 3
        },
        {
          text: '爱了爱了',
          color: '#ff00ff',
          time: 5
        },
        {
          text: '爱了爱了',
          color: '#ff00ff',
          time: 10
        },
        {
          text: '爱了爱了',
          color: '#ff00ff',
          time: 15
        },
        {
          text: '爱了爱了',
          color: '#ff00ff',
          time: 20
        }
    ],
    // 作者信息
    mvInfo:{},
    recommend:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({id:options.id});
    this.fetchMvDetail(this.data.id)
    this.fetchMvDetailInfo(this.data.id)
    this.fetchMvRecommend(this.data.id)
  },
  // 网络请求
  // 请求视频Url
  async fetchMvDetail(id) {
    const res = await getMvDetail(id)
    this.setData({mvUrl:res.data.url})
  },

  // 请求作者信息
  async fetchMvDetailInfo(id){
    const res = await getMvDetailInfo(id)
    this.setData({
      mvInfo:res.data
    })
  },
  // 请求推荐视频
  async fetchMvRecommend(id) {
    const res = await getMvRecommend(id)
    this.setData({recommend:res.data})
  }
})