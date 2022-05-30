
export const getters = {
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
}