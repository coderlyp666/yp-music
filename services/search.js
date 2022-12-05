import { YpReqInstance } from "./index"

export function getHotSearchSong() {
  return YpReqInstance.get({
    url:'/search/hot'
  })
}
export function getSearchSuggest (keywords) {
  return YpReqInstance.get({
    url:`/search/suggest?keywords=${keywords}&type=mobile`
  })
}

export function getSongList(keywords) {
  return YpReqInstance.get({
    url:`/cloudsearch?keywords=${keywords}`
  })
}
