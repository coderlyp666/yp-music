// pages/detail-ranking/detail-ranking.js
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
import { getMusicSongList } from "../../services/music"
import playerStore from "../../store/playerStore";
import menuStore from "../../store/menuStore";


import {fCollection, LCollection, HCollection} from "../../database/database"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankings:{},
    type:'',
    id:0,
    offset:0,
    collection:{},
    flag:true,
    menuList:[],
    menuName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
  // 获取openid
    const openid = wx.getStorageSync('openid')
    this.data.menuName = options.type
    
    menuStore.onState("menuList", value => {
      console.log(value);
      this.setData({menuList:value})
    })
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
       
    }else if(options.type === "favor"){
      this.setData({
        collection:fCollection
      })
      if(!openid) {
        wx.showToast({
          title: '请先登录',
          icon:"error"
        })
        wx.navigateTo({
          url: '/pages/main-profile/main-profile',
        })
        return
      }
      const res = await fCollection.select({
        _openid:openid
      },false)
      console.log(res);
      wx.setNavigationBarTitle({
        title:options.name,
      })
      this.setData({
        rankings:{
          tracks:res.data,
          name:options.name
        },
        type:options.name,
      })
      this.setData({
        offset:this.data.rankings.tracks.length
      })
    }else if(options.type === "like"){
      this.setData({
        collection:LCollection
      })
      if(!openid) {
        wx.showToast({
          title: '请先登录',
        })
        return
      }
      const res = await LCollection.select({
        _openid:openid
      },false)
      console.log(res);
      wx.setNavigationBarTitle({
        title:options.name,
      })
      this.setData({
        rankings:{
          tracks:res.data,
          name:options.name
        },
        type:options.name,
      })
      this.setData({
        offset:this.data.rankings.tracks.length
      })
    }else if(options.type === 'history'){
      this.setData({
        collection:HCollection
      })
      const res = await this.data.collection.select(null, true, this.data.offset)
      console.log(res);
      wx.setNavigationBarTitle({
        title:options.name,
      })
      this.setData({
        rankings:{
          tracks:res.data,
          name:options.name,
        },
        type:options.name,
      })

    }else if(options.type === 'menu') {
      console.log(options.index);
      console.log(options.name);
      const list = this.data.menuList[options.index].songList
      const name = this.data.menuList[options.index].name
      this.setData({
        rankings:{
          tracks:list,
          name
        }
      })
    }
  },
  // 网络请求
  async fetchMusicSongList(id) {
   const res = await  getMusicSongList(id)
   this.setData({rankings:res.playlist})
  },
  // 事件监听
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playerList", this.data.rankings.tracks)
    playerStore.setState("playerIndex", index)
  },
  delIndex(event) {
    console.log(event);
    const index = event.currentTarget.dataset.index
    const newArr = []
    this.data.rankings.tracks.forEach(item => {
      if(this.data.rankings.tracks[index] !== item) {
        newArr.push(item)
      }
    })
    this.setData({
      rankings:{
        tracks:newArr
      }
    })
    console.log(newArr);
  },
 async onReachBottom() {
    this.hasReachBottom()
  },
 async hasReachBottom() {
   const type = this.data.menuName
    const res = await this.data.collection.select(null, true ,this.data.offset)
    if(res.data.length === 0) {
      return
    }
    console.log(res);
    const newArr = [...this.data.rankings.tracks, ...res.data]
    this.setData({
      rankings:{
        tracks:newArr
      }
    })
    this.setData({
      offset:this.data.rankings.tracks.length
    })
  }

})