import { YpReqInstance } from "./index"

export function getBannerList(){
  return YpReqInstance.get({
    url:'/banner'
  })
}

export function getMusicSongList(id) {
  return YpReqInstance.get({
    url:'/playlist/detail',
    data:{
      id
    }
  })
}

export function getSongList(cat = "全部",limit = 6, offset = 0){
  return YpReqInstance.get({
    url:'/top/playlist',
    data:{
      cat,
      limit,
      offset
    }
  })
}

export function getMoreSongTag() {
  return YpReqInstance.get({
    url:'/playlist/hot'
  })
}