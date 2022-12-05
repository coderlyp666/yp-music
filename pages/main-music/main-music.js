// pages/main-music/main-music.js
import { getBannerList, getSongList } from "../../services/music"

import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"
import playerStore from "../../store/playerStore"

import querySelect from "../../utils/query-select"
import { throttle } from "underscore"


const queryThrottle = throttle(querySelect, 100)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    bannerList:[],
    bannerHight:0,
    // 推荐歌曲
    RecommendedSongs:[],
    // 热门歌单
    hotSongs:[],
    // 推荐歌单
    recSongs:[],
    // 巅峰榜
    rankingInfos:{},
    isRanking:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchBannerList()
    this.fetchSongList()
    // 发起action
    recommendStore.dispatch('fetchMusicSongListAction')
    recommendStore.onState("recommendSongInfos",value => {
      if(!value.tracks) return
      this.setData({RecommendedSongs:value.tracks.slice(0,5)})
    })
    
    rankingStore.dispatch("fetchRankingDataAction")
    // 监听数据变化
    // rankingStore.onState("newRanking", value => {
    //   const Rankings = {...this.data.rankingInfos, newRanking:value};
    //   this.setData({rankingInfos:Rankings})
    //   console.log("新歌榜",value);
    // })
    // rankingStore.onState("upRanking", value => {
    //   const Rankings = {...this.data.rankingInfos, upRanking:value};
    //   this.setData({ rankingInfos:Rankings})
    //   console.log("飙升榜",value);
    // })
    // rankingStore.onState("originalRanking", value => {
    //   const Rankings = {...this.data.rankingInfos, originalRanking:value};
    //   this.setData({ rankingInfos:Rankings})
    //   console.log("原创榜",value);
    // })

    rankingStore.onState("newRanking", this.handRankingData("newRanking"))
    rankingStore.onState("upRanking", this.handRankingData("upRanking"))
    rankingStore.onState("originalRanking", this.handRankingData("originalRanking"))
  },
  onReady(){
    
  },
  // 网络请求
  async fetchBannerList() {
    const res = await getBannerList()
    this.setData({bannerList:res.banners})
  },
  async fetchSongList() {
    getSongList().then(res => {
      this.setData({hotSongs:res.playlists})
    })
    getSongList("华语").then(res => {
      this.setData({recSongs:res.playlists})
    })
   
  },

  // 封装
  handRankingData(key) {
    return value => {
      if(!value.name) return
      const Rankings = {...this.data.rankingInfos, [key]:value};
      this.setData({rankingInfos:Rankings,isRanking:true})
    }
  },

  // 事件监听
  // 点击跳转到搜索页面
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  // 
  onMoreTap() {
    wx.navigateTo({
      url: '/pages/detail-ranking/detail-ranking?type=recommend',
    })
  },
  // 监听图片加载完成
  onImageLoad() {
     queryThrottle('.bannerImage').then(res => {
       this.setData({bannerHight:res[0].height})
     })
  },
  // 获取播放列表
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playerList", this.data.RecommendedSongs)
    playerStore.setState("playerIndex", index)
  }

})