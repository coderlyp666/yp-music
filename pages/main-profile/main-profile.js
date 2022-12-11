// pages/main-profile/main-profile.js
import { MCollection } from "../../database/database"
import menuStore from "../../store/menuStore"
const app = getApp()
const openid = app.globalObject.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存用户信息
    userInfo:{},
    tabs: [
      { name: "我的收藏", type: "favor" },
      { name: "我的喜欢", type: "like" },
      { name: "最近播放", type: "history" },
    ],
    isLogin:false,
    isShow:false,
    // 菜单名称
    menuName:'',
    // 菜单列表
    menuList:[]
  },
 async onLoad() {
    
    const userInfo = await wx.getStorageSync('userInfo')
    if(userInfo) {
      this.setData({userInfo})
    }
    // console.log(userInfo);
    //查询歌单
    if(!openid)return
    menuStore.onState("menuList", value => {
      this.setData({menuList:value})
    })
  },
  //事件监听 

  // 获取用户登录信息
  async onInfoTap() {
    if(this.data.isLogin) {
      wx.showModal({
        title: '',
        content: '退出当前账号？',
        complete: (res) => {
          if (res.cancel) { }
          if (res.confirm) {
            wx.removeStorageSync('openid')
            wx.removeStorageSync('userInfo')
            this.setData({
              isLogin:false,
              userInfo:{}
            })
          }
        }
      })
    }else {
      const {userInfo} = await wx.getUserProfile({
        desc: '获取你的信息',
      })
      // 保存用户信息
      wx.setStorageSync('userInfo', userInfo)
      this.setData({userInfo})
      
      const res = await wx.cloud.callFunction({
        name:'login'
      })
      const openid = res.result.openid
      
      wx.setStorageSync('openid', openid)
      this.setData({isLogin:true})
      // console.log(userInfo);
    }
   
  },
  // 点击跳转
  onTabItem(event) {
    const openid = wx.getStorageSync('openid')
    console.log(openid);
    if(!openid){
      if(event.currentTarget.dataset.item.type === 'history') {
        
      }else {
        wx.showToast({
          title: '请先登录~',
          icon:"error"
        })
        return
      }
    }
    const {name, type} = event.currentTarget.dataset.item
    console.log( type);
    wx.navigateTo({
      url: `/pages/detail-ranking/detail-ranking?type=${type}&name=${name}`,
    })
  },
  // 展示dialog
  onAddSongTap() {
    if(!openid){
      wx.showToast({
        title: '请先登录~',
        icon:"error"
      })
      return
    }
    this.setData({isShow:true})
  
  },
  // 歌单跳转
  onMenuItemTap(event) {
    console.log(event.currentTarget.dataset.index);
    const index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/detail-ranking/detail-ranking?type=menu&index=${index}`,
      
    })
  },
  // 添加歌单
 async onConfirmClick() {
   if(this.data.menuName.trim() === ""){
     wx.showToast({
       title: '歌单名称为空',
       icon:"error"
     })
     return
   }
   const res1 = await MCollection.select({
     name:this.data.menuName
   },false)
   console.log(res1);
   if(res1.data.length) {
     wx.showToast({
       title: '该歌单已存在',
       icon:"error"
     })
     return
   }
   const res2 = await MCollection.add({
      name:this.data.menuName,
      songList:[]
    })
    if(res2) {
      wx.showToast({
        title: '添加成功',
      })
    }
    menuStore.dispatch("fetchMenuListData")
  },
})