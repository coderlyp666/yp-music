import { HYEventStore } from "hy-event-store"
import { getMusicSongList } from "../services/music"

const recommendStore = new HYEventStore({
  state:{
    recommendSongInfos:[]
  },
  actions:{
    fetchMusicSongListAction(ctx) {
       getMusicSongList(3778678).then(res => {
        const playlist = res.playlist;
        ctx.recommendSongInfos = playlist
       })
     
    }
  }
})

export default recommendStore