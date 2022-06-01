<script setup>
  import { reactive, inject, defineProps, toRefs, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import EpisodeBoardLoading from '../components/lodingView/episodeBoardLoading.vue'
  import { toYYYYMMDD,secFormateStr } from "../helper";
  const mapStore = inject("mapStore");
  const { store,setPlayEpisode } = mapStore;
  const route = useRoute();

  const state = reactive({
    ...toRefs(store),
    episodeData: {},
    loading:true,
  });
  
  function playEp(ep){
    setPlayEpisode(ep)
  }

  function getEpisodeData(){
    state.episodeData = state.episodeList.find(ep=>ep.guid === route.params.epid)
    waitTillImgSet()
  }

  function waitTillImgSet(){
    setTimeout(function () {
        state.loading = false
    }, 1000);
  }

  onMounted(()=>{
    getEpisodeData()
    waitTillImgSet()
  })

</script>

<template>
  <div class="ml-[2rem] mt-[2rem]" v-if="Object.keys(state.episodeData).length > 0">
    
    <EpisodeBoardLoading v-if="state.loading"/>
    <div v-else class="flex flex-row">
      <picture>
        <img class="h-[300px] aspect-auto rounded-[.5rem] m-[1.5rem] ml-0" :src="state.episodeData.itunes.image"  alt="episode picture" >
      </picture>

      <article class="flex flex-col m-[1.5rem] flex-grow">
        <div class="flex flex-col justify-center">
          <span>
            {{ toYYYYMMDD(state.episodeData.pubDate) }}．第{{state.episodeData.itunes.season}}季第{{state.episodeData.itunes.episode}}集．{{secFormateStr(state.episodeData.itunes.duration)}}
          </span>
          <h1 class="main-title font-semibold text-white">
            {{state.episodeData.title}}
          </h1>
          <h1 class="main-title text-purple-500">
            {{state.channel.title}}
          </h1>
        </div>
        <div class="absolute bottom-0 left-0 flex flex-row justify-between w-full">
          <button @click="()=>playEp(state.episodeData)" class="main-play-btn">
            播放
          </button>
          <div class="flex items-center">
            <span v-on:click="" class="episode-function-icon">
              <font-awesome-icon :icon="['fas', 'bookmark']" />
            </span>
            <span v-on:click="" class="episode-function-icon">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </span>
            <span v-on:click="" class="episode-function-icon">
              <font-awesome-icon :icon="['fas', 'ellipsis']" />
            </span>
          </div>
        </div>

      </article>
    </div>

    <hr class="box-border h-[0px] my-[20px]" />

    <article v-html="state.episodeData['content:encoded']"></article>
  </div>
    
</template>
