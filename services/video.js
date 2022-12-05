import { YpReqInstance } from "./index"

export function getMvTopList(offset = 0,limit = 20) {
  return YpReqInstance.get({
    url:'/top/mv',
    data:{
      offset,
      limit
    }
  })
}
export function getMvDetail(id) {
  return YpReqInstance.get({
    url:'/mv/url',
    data:{
      id
    }
  })
}

export function getMvDetailInfo(mvid) {
  return YpReqInstance.get({
    url:'/mv/detail',
    data:{
      mvid
    }
  })
}

export function getMvRecommend(id) {
  return YpReqInstance.get({
    url:'/related/allvideo',
    data:{
      id
    }
  })
}

