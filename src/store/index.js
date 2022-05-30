import { reactive, readonly } from "vue";

const state = reactive({
  count: 0,
  channel:{},
  episodeList:[],
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

export default {
  store: readonly(state),
  addCount,
  removeCount,
  setChannel,
  setEpisodeList,
};