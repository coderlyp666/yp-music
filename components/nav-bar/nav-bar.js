// components/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },

  properties: {
    title:{
      type:String,
      value:"默认导航"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNavigateBack() {
      wx.navigateBack({
        delta:1
      })
    }
  }
})
