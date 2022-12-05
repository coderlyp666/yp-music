import { YpReqInstance } from "./index"

export function getSongDetali(ids) {
  return YpReqInstance.get({
    url:'/song/detail',
    data:{  
      ids
    }
  })
}

export function getSongLyric(id) {
  return YpReqInstance.get({
    url:'/lyric',
    data:{
      id
    }
  })
}