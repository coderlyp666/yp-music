// app.js
App({
  globalObject:{
    statusHeight:20,
    screenHeight:0,
    openid:''
  },
 async onLaunch() {
    // 获取设备信息
    wx.getSystemInfo({
      success:(res) => {
        this.globalObject.statusHeight = res.statusBarHeight
        this.globalObject.screenHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
    this.globalObject.openid = wx.getStorageSync('openid')
     // 初始化云开发能力
     wx.cloud.init({
      env: "cloud1-4glu1kc784c2dea5",
      traceUser: true
    })
  }
})
