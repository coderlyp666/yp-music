// components/song-cat-show-v1/song-cat-show-v1.js
import { fCollection, LCollection } from "../../database/database"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{}
    },
    index:{
      type:Number,
      value:0
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
    onSongItemTap() {
      const id = this.properties.itemData.id
      console.log(id);
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
    },
    onDomainTap() {
      wx.showActionSheet({
        itemList: ['收藏', '喜欢'],
      }).then(async res => {
          console.log(res.tapIndex)
          if(res.tapIndex === 0) {
           this.hasDomain(fCollection, '收藏')
          }else if(res.tapIndex === 1) {
            this.hasDomain(LCollection, '喜欢')
          }
      }).catch(err => {
        console.log(err);
      })
    },
    async hasDomain(collection, tag) {
      const openid = wx.getStorageSync('openid')
      if(!openid) {
        wx.showToast({
          title: '请先登录',
          icon:"error"
        })
        wx.navigateTo({
          url: '/pages/main-profile/main-profile.',
        })
        return
      }
      const res1 = await collection.select({
        name:this.properties.itemData.name,
        _openid:openid
      }, false)
      console.log(res1);
      if(!res1.data.length){
        const res = await  collection.add(this.properties.itemData)
        console.log(res);
        if(res) {
          wx.showToast({
            title: `添加到${tag}`,
          })
         }
      }else {
        const res = await collection.del({
          name:this.properties.itemData.name,
          _openid:openid
        },false)
        if(res) {
          wx.showToast({
            title: `取消${tag}`,
          })
          // const arr = []
          // arr.splice
          // this.data..splice
          this.triggerEvent('delIndex', this.properties.index)
        }
      }
    }
    
  },
  
})
