// components/menu-item/menu-item.js
import menuStore from "../../store/menuStore"
import { MCollection } from "../../database/database"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{}
    },
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
   async onDelMenuTap() {
      console.log(this.properties.index);
      const res = await MCollection.del(this.properties.itemData._id)
      if(res) {
        wx.showToast({
          title: '删除成功！',
        })
      }
      menuStore.dispatch("fetchMenuListData")
      
    }
  }
})
