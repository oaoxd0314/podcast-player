import { reactive, readonly } from "vue";

const state = reactive({
  channel:{},
  episodeList:[],
  nowPlaying:{},
  globalIsPlay:false,
  globalPlayingCurrTime:0,

  outsideTrigger:false,
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

const setGlobalIsPlay = (bool) =>{
  state.globalIsPlay = bool
}

const setGlobalCurrTime = (time) =>{
  state.globalPlayingCurrTime = time
}

const setOutSideTrigger = (bool) =>{
  state.outsideTrigger = bool
}

export default {
  store: readonly(state),
  setChannel,
  setEpisodeList,
  setPlayEpisode,
  setGlobalIsPlay,
  setGlobalCurrTime,
  setOutSideTrigger
};