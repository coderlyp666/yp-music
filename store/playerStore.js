import { HYEventStore } from "hy-event-store"
const playerStore = new HYEventStore({
  state:{
    playerList:[],
    playerIndex:-1
  },
})

export default playerStore