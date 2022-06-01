import { reactive, readonly } from "vue";

const state = reactive({
  channel:{},
  episodeList:[],
  nowPlaying:{},
  isPlay:false,
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

const isPlayToggle = () =>{
  state.isPlay = !state.isPlay
}

export default {
  store: readonly(state),
  setChannel,
  setEpisodeList,
  setPlayEpisode,
  isPlayToggle,
};