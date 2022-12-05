// app.js
App({
  globalObject:{
    statusHeight:20,
    screenHeight:0
  },
  onLaunch() {
    wx.getSystemInfo({
      success:(res) => {
        this.globalObject.statusHeight = res.statusBarHeight
        this.globalObject.screenHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
  }
})
