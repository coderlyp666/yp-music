// pages/detail-ranking/detail-ranking.js
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
import { getMusicSongList } from "../../services/music"
import playerStore from "../../store/playerStore";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankings:{},
    type:'',
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    if(options.type === 'ranking') {
      rankingStore.onState(options.key, value => {
        wx.setNavigationBarTitle({
          title: value.name,
        })
        this.setData({
          rankings:value,
          type:options.type,
          id:options.id
        })
      })
    }else if(options.type === 'recommend') {
      recommendStore.onState('recommendSongInfos', value => {
        wx.setNavigationBarTitle({
          title:'推荐歌曲',
        })
        this.setData({
          rankings:value,
          type:options.type,
          id:options.id
        })
      })
    }else if(options.type === 'song') {
      this.setData({
        type:options.type,
        id:options.id
      })
        wx.setNavigationBarTitle({
          title:'歌单',
        })
      this.fetchMusicSongList(options.id)
       
    }
  },
  // 网络请求
 async fetchMusicSongList(id) {
   const res = await  getMusicSongList(id)
   console.log(res);
   this.setData({rankings:res.playlist})
  },
  // 事件监听
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playerList", this.data.rankings.tracks)
    playerStore.setState("playerIndex", index)
  }
})