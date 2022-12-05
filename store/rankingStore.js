import { HYEventStore } from "hy-event-store"
import { getMusicSongList } from "../services/music"
const rankingIds = [3779629, 2884035, 19723756];
const rankingStore = new HYEventStore({
  state:{
    newRanking:{},
    upRanking:{},
    originalRanking:{}
  },
  actions:{
    fetchRankingDataAction(ctx) {
      for (const id of rankingIds) {
        getMusicSongList(id).then(res => {
          if(id === 3779629) {
            ctx.newRanking = res.playlist
          } else if(id === 2884035) {
            ctx.originalRanking = res.playlist
          } else if(id === 19723756){
            ctx.upRanking = res.playlist
          }
        })
      }
    }
  }
})
export default rankingStore
