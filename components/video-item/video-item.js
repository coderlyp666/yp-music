// components/video-item/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{}
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
    onItemTap(event) {
      console.log(this.properties.itemData.id);
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/detail-video/detail-video?id=${id}`,
      })
    }
  }
})
