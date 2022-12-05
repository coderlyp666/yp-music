// components/song-list/song-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'默认歌单'
    },
    songList:{
      type:Array,
      value:[]
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
    onMoreTap() {
      // console.log('onMoreTap');
      wx.navigateTo({
        url: '/pages/song-list-detail/song-list-detail',
      })
    }
  }
})
