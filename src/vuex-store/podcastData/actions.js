
export const actions = {
    storeChannel({ commit },channel){
        commit('SET_CHANNEL_INFO_DATA', channel)
    },
    storeEpisodes({ commit },episodes){
        commit('SET_EPISODE_LIST_DATA', episodes)
    }
}