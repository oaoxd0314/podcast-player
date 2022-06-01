import { reactive, readonly } from "vue";

const state = reactive({
  channel:{},
  episodeList:[],
  nowPlaying:{},
});

const setEpisodeList = (episodes) =>{
    state.episodeList = episodes
}

const setChannel = (channel) =>{
    state.channel = channel
}

const setPlayEpisode = (episode) =>{
  state.nowPlaying = episode
}

export default {
  store: readonly(state),
  setChannel,
  setEpisodeList,
  setPlayEpisode,
};