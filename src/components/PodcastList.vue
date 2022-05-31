<script setup>
import { onMounted, reactive, inject, toRefs } from "vue";
import { useStore } from 'vuex'
import xml2js from 'xml2js';

import { fetchAPI,toYYYYMMDD,secFormateStr } from '../helper'
import PodcastItem from './PodcastItem.vue'

const RSS_URL = 'https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml';

const mapStore = inject("mapStore");
const { store ,setEpisodeList ,setChannel ,setPlayEpisode } = mapStore;

const state = reactive({
    ...toRefs(store),
    status: '',
    loading: false,
    error: false,
});

async function getFeed(url) {
    state.loading = true
    state.status = 'loading'
    return fetchAPI('/podcast',{podcast:url}).then(response => {
        state.loading = false
        if(response.status === 200){
            console.log(response)
            setEpisodeList(response.data.items)
            setChannel(response.data)
        }else{
            state.error = true
            state.status = '發生預期外的錯誤，請稍後再試。'
        }
    }).catch(err => {
        console.log(err)
        state.status = '網路發生問題，請檢查您的網路並稍後再試。'
    })
}

function onPlayClick(episode){
    setPlayEpisode(episode)
}

function continuePlaying(){
    console.log(state)
}

onMounted(() => {
    getFeed(RSS_URL)
})
</script>

<template>
    <section v-if="Object.keys(state.channel).length === 0">
        <h1 class="text-xl font-semibold">{{ state.status }}</h1>
    </section>
    
    <section v-else>
        <div class="flex flex-row mb-[2rem]">
            <img class="h-[300px] aspect-auto p-[1rem] rounded-[10%]"
                :src="state.channel.image.url" alt="">
            <section class="relative flex-2 flex flex-col p-[1rem]">
                <div class="flex flex-col mb-[1rem]">
                    <h1 class="text-lg font-semibold text-white">{{ state.channel.title}}</h1>
                    <p class="text-lg">{{ state.channel.itunes.author }}</p>
                    <span>4.9(2.1萬) {{ state.channel.itunes.categories.join(",") }} 每週更新兩次 </span>
                </div>

                <aside class="py-[1rem]">
                    <article class="line-clamp-3">
                        {{ state.episodeList[0].title }} {{ state.episodeList[0].itunes.summary}}
                    </article>
                </aside>

                <div class="absolute bottom-[1rem] left-0 p-2 w-[200px] bg-zinc-800 text-center rounded-md hover:cursor-pointer">
                    <button @click="continuePlaying" class="text-purple-500 font-semibold text-lg align-bottom">繼續</button>
                </div>
            </section>
        </div>
    </section>

    <section>
        <PodcastItem  v-for="item in state.episodeList.slice(0, 10)" :key="item.id">
            <template #episode-img>
                <img class="h-[200px] p-[1rem] rounded-[10%]" :src="item.itunes.image"
                    alt="podcast-img">
            </template>

            <template #episode-name>
                <router-link class="hover:bg-transparent hover:underline"  :to="`/episode/${item.guid}`" >
                    {{ item.title }}
                </router-link> 
            </template>

            <template #episode-date>
                {{ toYYYYMMDD(item.pubDate) }}
            </template>

            <template #episode-describe>
                {{ item.itunes.summary }}
            </template>

            <template #episode-play>
                <div class="absolute bottom-0 left-0 flex flex-row items-center">
                    <button @click="()=>onPlayClick(item)" class="font-semibold text-sm p-[.5rem]">
                        <span class=" text-purple-500 mr-[.5rem] ">
                            <font-awesome-icon :icon="['fas', 'play']" />
                        </span>
                        <span> 播放</span>
                    </button>

                    <span class="text-xs font-semibold">{{secFormateStr(item.itunes.duration)}}</span>
                </div>
                
                
            </template>
        </PodcastItem>
    </section>

</template>
