import { reactive, readonly } from "vue";

const state = reactive({
  count: 0,
  channel:{},
  episodeList:[],
  nowPlaying:{},
});

const addCount = () => {
    state.count++;
};

const removeCount = () => {
    state.count--;
};

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
  addCount,
  removeCount,
  setChannel,
  setEpisodeList,
  setPlayEpisode,
};