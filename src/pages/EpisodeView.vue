<script setup>
  import { reactive, inject, toRefs, onMounted } from "vue";
  import { useRoute, } from "vue-router";

  import { toStrMountAndDay, secFormateStr, getStorageCurrTime } from "../helper";
  import router from "../router";

  import EpisodeBoardLoading from '../components/lodingView/episodeBoardLoading.vue'
  import ArticleLoading from "../components/lodingView/articleLoading.vue";
  import Progress from "../components/Progress.vue";

  const mapStore = inject("mapStore");
  const { store,setPlayEpisode,setGlobalIsPlay } = mapStore;
  const route = useRoute();

  const state = reactive({
    ...toRefs(store),
    episodeData: {},
    loading:true,
  });
  
  function playEp(ep){
    if(state.globalIsPlay){ 
        setGlobalIsPlay(false)
    }else{
        setGlobalIsPlay(true)
        setPlayEpisode(ep)
    }
    
  }

  function getEpisodeData(){
    state.episodeData = state.episodeList.find(ep=>ep.guid === route.params.epid) || {}
  }

  function waitTillImgSet(){
    setTimeout(function () {
        state.loading = false
    }, 100);
  }

  onMounted(()=>{
    if(state.episodeList.length<1){
      router.push('/')
    }else{
      getEpisodeData()
      waitTillImgSet()
    }
  })
</script>

<template>

  <div class="mt-[2rem]" v-if="state.loading">
    <EpisodeBoardLoading />

    <hr class="box-border h-[0px] my-[20px]" />

    <ArticleLoading />
  </div>

  <div class="mt-[2rem]" v-else>
    <div class="flex flex-row">
      <picture class="relative" >
        <img class="h-[300px] aspect-auto rounded-[.5rem] m-[1.5rem] ml-0" :src="state.episodeData.itunes.image"  alt="episode picture" >

        <div class="absolute bottom-[3rem] w-full">
          <Progress 
            :curr-time="parseInt(state.episodeData.guid === state.nowPlaying.guid ? state.globalPlayingCurrTime : getStorageCurrTime(state.episodeData.guid))" 
            :duration="parseInt(state.episodeData.itunes.duration)" >
          </Progress>
        </div>

      </picture>

      <article class="flex flex-col m-[1.5rem] flex-grow">
        <div class="flex flex-col justify-center">
          <span>
            {{ toStrMountAndDay(state.episodeData.pubDate) }}．第{{state.episodeData.itunes.season}}季第{{state.episodeData.itunes.episode}}集．{{secFormateStr(state.episodeData.itunes.duration)}}
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
            {{ state.globalIsPlay ? '暫停' : '播放'}}
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