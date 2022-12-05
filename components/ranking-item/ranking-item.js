// components/ranking-item/ranking-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{}
    },
    key:{
      type:String,
      value:'newRanking'
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
    onNavTap() {
      console.log(this.properties.key);
      const key = this.properties.key
      wx.navigateTo({
        url: `/pages/detail-ranking/detail-ranking?type=ranking&key=${key}`,
      })
    }
  }
})
