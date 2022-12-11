export const db = wx.cloud.database()
class YPCollection {
  constructor(c_name) {
    this.collection =  db.collection(c_name)
  }
  add(data) {
  return  this.collection.add({
      data
    })
  }
  del(condition, isDoc = true) {
    if(isDoc) {
      return  this.collection.doc(condition).remove()
    }else{
     return this.collection.where(condition).remove()
    }
   
  }

  select(condition, isDoc = true, offset = 0,limit = 20) {
    if(isDoc) {
     return this.collection.skip(offset).limit(limit).get()

    }else {
     return this.collection.where(condition).get()
    }
  }

  update(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).update({
        data: data
      })
    } else {
      return this.collection.where(condition).update({
        data: data
      })
    }
  }
}


export const fCollection = new YPCollection('c_favorite')
export const LCollection = new YPCollection('c_like')
export const HCollection = new YPCollection('c_history')
export const MCollection = new YPCollection('c_menu')
