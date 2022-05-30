import { createStore } from 'vuex'
import {modules} from './modules'


export default createStore({
  state: {
    channelInfo:{},
    episodeList:[],
  },
  actions: {
    storeChannel({ commit },channel){
      commit('SET_CHANNEL_INFO_DATA', channel)
    },
    storeEpisodes({ commit },episodes){
        commit('SET_EPISODE_LIST_DATA', episodes)
    }
  },
  mutations: {
    SET_CHANNEL_INFO_DATA(state,channel){
        state.channelInfo = channel
    },
    SET_EPISODE_LIST_DATA(state,episodes){
        state.episodeList = episodes
    }
  },
  getters: {
    GetTest(state) {
        return state.test
    },
    getChannelInfo(state){
        return state.channelInfo
    },
    getEpisode(state,epid){
        let episode = state.episodeList.find(item=> item['soundon:id'] === epid)
        return episode
    },
    getEpisodeList(state){
        return state.episodeList
    }
  },
})

// export default createStore({
//   modules,
// })
