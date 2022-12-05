// pages/detail-search/detail-search.js
import { 
      getHotSearchSong, 
      getSearchSuggest,
      getSongList
        } from "../../services/search"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSongs:[],
    // 搜素歌词 
    keywords:'',
    // 
    suggestList:[],
    songList:[],
    isSong:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchHotSearchSong()
    console.log(this.data.lyricText);
  },

  // 网络请求
  async fetchHotSearchSong() {
    const res = await getHotSearchSong()
    this.setData({hotSongs:res.result.hots})
  },
  async fetchSongList() {
    const res = await getSongList(this.data.keywords)
    this.setData({songList:res.result.songs})
    console.log(res);
  },
  // 事件监听
  onlyricTextchange(event) {
    this.setData({keywords:event.detail})
     // 根据关键字搜索建议
     getSearchSuggest(this.data.keywords).then(res => {
      console.log(res);
      if(!res.result) return
      this.setData({
        suggestList:res.result.allMatch,
        isSong:false
      })
    })
  },
  // 
  onItemTap(event) {
    const songName = event.currentTarget.dataset.song
    console.log(songName);
    this.setData({keywords:songName,isSong:true})
    this.fetchSongList()
  },
  // onSearch
  onSearch() {
    console.log('sss');
    this.setData({isSong:true})
    this.fetchSongList()
  }
})