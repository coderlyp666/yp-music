export function ypRequest(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      method:'get',
      success:(res) => {
        resolve(res)
      },
      fail:reject
    })
  })
}
 class YpRequest  {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  request(options) {
    const { url } = options
    return new Promise((resolve,reject) => {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        ...options,
        url:this.baseUrl + url,
        success:(res) => {
          resolve(res.data)
          wx.hideLoading()
        },
        fail:(err) => {
          console.log(err);
          wx.hideLoading()
        }
      })
    })
  }
  get(options) {
    return this.request({
      ...options,
      method:'get'
    })
  }
  post(options) {
    return this.request({
      ...options,
      method:'post'
    })
  }
}
export const YpReqInstance =  new YpRequest("http://codercba.com:9002")
