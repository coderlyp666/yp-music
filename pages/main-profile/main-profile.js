// pages/main-profile/main-profile.js
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
    isLogin:false
  },
 async onLoad() {
    const userInfo = await wx.getStorageSync('userInfo')
    if(userInfo) {
      this.setData({userInfo})
    }
    // console.log(userInfo);
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
    console.log(type);
    wx.navigateTo({
      url: `/pages/detail-ranking/detail-ranking?type=${type}&name=${name}`,
    })
  }
})