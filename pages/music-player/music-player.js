// pages/music-player/music-player.js
import { getSongDetali, getSongLyric } from "../../services/player"
import parseLyric from "../../utils/parse-lyric"
import playerStore from "../../store/playerStore"

const app = getApp()
const audioContext = wx.getBackgroundAudioManager()
audioContext.title = 'jay'

const moduleNames = ["order", "repeat", "random"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 内容高度
    screenHeight:0,
    // 状态栏高度
    statusHeight:20,
    titles:["歌曲", "歌词"],

    id:0,
    // 保存歌曲详情信息
    songDetail:[],
    // 保存歌词
    lyrics:"",
    // swiper切换索引
    current:0,
    
    // 当前播放时间
    currentTime:0,
    // 总时间
    durationTime:0,
    // 进度条
    scheduleValue:0,
    type:'change',
    isPlayorPause:true,
    // 当前展示的歌词
    lyricText:'',
    currentIndex:-1,
    // 记录滚动到的歌词的位置
    lyricTextTop:0,
    // store
    playerList:[],
    playerIndex:0,

    moduleIndex:0,//0顺序播放,1单曲循环,2随机播放
    moduleName:'order'
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取歌曲id
    const id = options.id
    this.setData({
      statusHeight:app.globalObject.statusHeight,
      screenHeight:app.globalObject.screenHeight
    })
    // 播放歌曲
    this.setupSongPlay(id)
    // 
    playerStore.onStates(["playerList", "playerIndex"], this.getPlaySongInfos)
  },
  setupSongPlay(id) {
    this.setData({id})
    // 根据id请求歌曲详细数据
    this.fetchSongDetail(id)
    // audioContext.title = "sssss"
    // 根据id获取歌词
    getSongLyric(id).then(res => {
      const  lyricStr = res.lrc.lyric
      const lyrArr = parseLyric(lyricStr)
      this.setData({
        lyrics:lyrArr
      })
    })

  
    audioContext.onPause(() => {
      console.log('paly');
    })
    audioContext.stop()
    //根据id播放歌曲
    console.log(id);
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // 加载完中的播放
    // audioContext.autoplay = true
    audioContext.play()
    // 
    // if(!this.data.lyrics.length) {
    //   this.setData({lyricText:this.data.lyrics[0].text})
    // }
    audioContext.onTimeUpdate(() => {
      // 记录当前时间
      const currentTime = audioContext.currentTime * 1000
      this.setData({
        scheduleValue:this.data.currentTime / this.data.durationTime * 100
      })
      if(this.data.type === 'changing') return
      this.setData({
        currentTime,
      })
      
      // 获取正在播放的歌词
      if(!this.data.lyrics.length)return
      
      let index = this.data.lyrics.length - 1
      if(this.data.lyrics.length == 1) {
        this.setData({
          lyricText:this.data.lyrics[0].text,
        })
        return
      }else {
        for (let i = 0; i < this.data.lyrics.length; i++) {
          const lyricInfo = this.data.lyrics[i]
          if(lyricInfo.time > audioContext.currentTime * 1000) {
            index = i - 1
            break
          }
        }
        // 优化性能
      if(this.data.currentIndex === index)return
      if(!this.data.lyrics[index].text) return
      
      this.setData({
        lyricText:this.data.lyrics[index].text,
        currentIndex:index,
        lyricTextTop:35 * index
      })
      }
      
    })
    // 如果音频在加载中，停止播放
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    // 音频进入可以播放，开始播放
    audioContext.onCanplay(() => {
      this.setData({type:'change'})
      audioContext.play()
    })
    audioContext.onEnded(() => {
      // 单曲循环不需要切换下一首
      if(this.data.moduleIndex === 1) return
      this.changeSongIndex()
    })
    audioContext.onPlay(() => {
      this.setData({isPlayorPause:true})
    })
    audioContext.onPause(() => {
      this.setData({isPlayorPause:false})
    })
    audioContext.onError(() => {
      console.log('eer');
      this.changeSongIndex()
    })
    // 下一首
    audioContext.onNext(() => {
      this.changeSongIndex()
    })
    // 上一首
    audioContext.onPrev(() => {
      this.changeSongIndex(false)
    })
  },
  // 网络请求
  async fetchSongDetail(id){
    const res = await getSongDetali(id)
    console.log(res);
    audioContext.title = res.songs[0].name
    audioContext.singer = res.songs[0].ar[0].name
    audioContext.coverImgUrl = res.songs[0].al.picUrl
    this.setData({
      songDetail:res.songs,
      durationTime:res.songs[0].dt
    })
  },

  // 事件监听
  onChangeCurrent(options) {
    const current = options.detail.current;
    this.setData({current})
    
  },
  // 切换歌曲/歌词
  onItemTap(options) {
    const index = options.currentTarget.dataset.index
    this.setData({
      current:index
    })
  },
  // 监听点击进度条
  onScheduleChange(event) {
  //  获取点击进度条对应的值
   const value = event.detail.value
  
  //  计算出要播放的时间位置
  const currentTime = value / 100 * this.data.durationTime
  // 设置播放器播放的计算出的时间
   audioContext.seek(currentTime / 1000)
   audioContext.play()
   this.setData({
     currentTime:currentTime, 
     scheduleValue:value,
     isPlayorPause:true
    })
  },
  // 监听拖动进度条
  onScheduleChanging(event) {
    this.setData({type:event.type})
  //  获取拖动进度条对应的值
   const value = event.detail.value
   //  计算出要播放的时间位置
   const currentTime = value / 100 * this.data.durationTime

   this.setData({currentTime})
   audioContext.seek(currentTime / 1000)
  //  audioContext.pause()
  },
  // 点击播放/暂停
  onPlayorPause() {
    if(!this.data.isPlayorPause) {
      audioContext.play()
      this.setData({isPlayorPause:true})
    }else {
      audioContext.pause()
      this.setData({isPlayorPause:false})
    }
   
  },
  // 上一首
  onPrevSongTap() {
   this.changeSongIndex(false)
  },
  // 下一首
  onNextSongTap() {
    this.changeSongIndex()
  },
  changeSongIndex(flag = true) {
     //  初始化数据
     this.setData({
      currentTime:0,
      songDetail:{},
      durationTime:0,
      scheduleValue:0,
      lyricText:'',
      isPlayorPause:true
    })
     // 获取索引
     let length = this.data.playerList.length
     let index = this.data.playerIndex
    
     // 边界判断
     switch(this.data.moduleIndex) {
       case 1:
       case 0:
        index = flag ?  index + 1 : index - 1
         break
       case 2:
         let randomNum = this.random(length)
         if(index === randomNum){
           randomNum = this.random(length)
         }
         index = randomNum
        break 
     }
      if(index === 0) index = length - 1
      if(index === length) index = 0
     // 更新index
     playerStore.setState("playerIndex", index)


    // 开始播放新的歌曲
     this.setupSongPlay(this.data.playerList[index].id)
  },
  random(length){
    return Math.floor(Math.random() * length)
  },
  // 切换播放模式
  onChangeModuleTap() {
    let index = this.data.moduleIndex;
    index = index + 1;
    if(index === 3) index = 0
    if(index === 1){
      audioContext.loop = true
    }else {
      audioContext.loop = false
    }
    this.setData({
      moduleIndex:index,
      moduleName:moduleNames[index]
    })
  },
  // store
  getPlaySongInfos({playerList, playerIndex}) {
    if(playerList) {
      this.setData({
        playerList,
      })
    }

    if(playerIndex !== undefined) {
      this.setData({
        playerIndex
      })
    }
 
  }
})