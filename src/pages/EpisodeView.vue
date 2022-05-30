<script setup>
  import { reactive, inject, defineProps, toRefs, onMounted } from "vue";
  import { useRoute } from "vue-router";
  const mapStore = inject("mapStore");
  const { store } = mapStore;
  const route = useRoute();

  const state = reactive({
    ...toRefs(store),
    epid:'',
    episodeData: {},
  });
  
  onMounted(()=>{
    getEpisodeData()
  })

  function getEpisodeData(){
    state.episodeData = state.episodeList.find(ep=>ep["soundon:id"][0] === route.params.epid)
  }

  console.log(state.episodeData)
  console.log(Object.keys(state.episodeData))
  
</script>

<template>
  this episode id is {{$route.params.epid}}。
    <div v-if="Object.keys(state.episodeData).length === 0" >
      loading
    </div>
    <div v-else class="flex flex-row">
      <picture>
        <img class="h-[300px] aspect-auto" :src="state.episodeData['itunes:image'][0]"  alt="episode picture" >
      </picture>

    </div>
    <div>

    </div>
</template>
