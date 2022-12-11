import { HYEventStore } from "hy-event-store"
import { MCollection } from "../database/database"

const menuStore = new HYEventStore({
  state:{
    menuList:[]
  },
  actions:{
    async fetchMenuListData(ctx) {
      const res = await MCollection.select()

      ctx.menuList = res.data
    }
  }

})

menuStore.dispatch("fetchMenuListData")

export default menuStore