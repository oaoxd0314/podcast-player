<script setup>
  import { reactive, inject, defineProps, toRefs, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { toYYYYMMDD,secFormateStr } from "../helper";
  const mapStore = inject("mapStore");
  const { store } = mapStore;
  const route = useRoute();

  const state = reactive({
    ...toRefs(store),
    episodeData: {},
  });
  
  onMounted(()=>{
    getEpisodeData()
  })

  function getEpisodeData(){
    console.log(state.episodeList)
    state.episodeData = state.episodeList.find(ep=>ep.guid === route.params.epid)
  }
</script>

<template>
  <div v-if="Object.keys(state.episodeData).length === 0" >
    loading
  </div>

  <div class="ml-[2rem] mt-[2rem]" v-else>
    <div  class="flex flex-row">
      <picture>
        <img class="h-[300px] aspect-auto rounded-[.5rem] m-[1.5rem] ml-0" :src="state.episodeData.itunes.image"  alt="episode picture" >
      </picture>

      <article class="flex flex-col m-[1.5rem] flex-grow">
        <div class="flex flex-col justify-center">
          <span>
            {{ toYYYYMMDD(state.episodeData.pubDate) }}．第{{state.episodeData.itunes.season}}季第{{state.episodeData.itunes.episode}}集．{{secFormateStr(state.episodeData.itunes.duration)}}
          </span>
          <h1 class="text-3xl font-semibold text-white">
            {{state.episodeData.title}}
          </h1>
          <h1 class="text-3xl text-purple-500">
            {{state.channel.title}}
          </h1>
        </div>
        <div class="absolute bottom-0 left-0 flex flex-row justify-between w-full">
          <button class="p-2 w-[200px] bg-purple-500 text-center rounded-md hover:cursor-pointer text-white font-semibold">
            播放
          </button>
          <div class="flex items-center">
            <span v-on:click="" class="p-[.5rem] hover:text-purple-500 ">
              <font-awesome-icon :icon="['fas', 'bookmark']" />
            </span>
            <span v-on:click="" class="p-[.5rem] hover:text-purple-500 ">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </span>
            <span v-on:click="" class="p-[.5rem] hover:text-purple-500 ">
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
