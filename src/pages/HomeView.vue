<script setup>
import { onMounted, reactive, inject, toRefs } from "vue";

import { fetchAPI,toYYYYMMDD,secFormateStr,getStorageCurrTime,getStorage } from '../helper'

import Progress from "../components/Progress.vue"; 
import ChannelBoard from '../components/ChannelBoard.vue';
import EpisodeItem from '../components/EpisodeItem.vue'
import ChannelBoardLoading from "../components/lodingView/channelBoardLoading.vue";
import EpisodeListLoading from "../components/lodingView/episodeListLoading.vue";

const mapStore = inject("mapStore");
const { store ,setEpisodeList ,setChannel ,setPlayEpisode,setGlobalIsPlay,setOutSideTrigger } = mapStore;

const state = reactive({
    ...toRefs(store),
    status: '',
    loading: false,
    error: false,
    limit:10,
});

const RSS_URL = 'https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml';

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
    console.log(state.globalIsPlay)
    console.log(episode.guid === state.nowPlaying.guid)

    if(state.globalIsPlay && (episode.guid === state.nowPlaying.guid)){ 
        console.log('stop?')
        setGlobalIsPlay(false)
    }else{
        console.log('play?')
        setOutSideTrigger(true)
        setPlayEpisode(episode)
    }
}

function continuePlaying(){
    console.log(state)
}

function handleScroll(){
    // console.log(window.scrollY)
    // console.log(window.screen.height)
    // console.log('------------------------')
    // console.log(document.body.scrollHeight)
    // console.log('------------------------')
    if (window.scrollY + window.screen.height >= document.body.scrollHeight+120) {
        loadMore();
    }
}

function loadMore(){
    console.log('load')
    state.limit += 10
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getFeed(RSS_URL)
    console.log(getStorage('epStatus'))
})

</script>

<template>
    <section v-if="state.loading" >
        <ChannelBoardLoading />
        <EpisodeListLoading />
    </section>

    <section v-else >
        <ChannelBoard v-if="Object.keys(state.channel).length > 0">
            <template #channel-img>
                <img class="h-[300px] main-img" :src="state.channel.image.url" alt="">
            </template>

            <template #channel-info>
                <h1 class="main-title font-semibold text-white">{{ state.channel.title}}</h1>
                <p class="main-title">{{ state.channel.itunes.author }}</p>
            </template>

            <template #channel-otherInfo>
                <span>4.9(2.1萬) {{ state.channel.itunes.categories.join(",") }} 每週更新兩次 </span> 
            </template>

            <template #channel-latest-episode>
               {{ state.episodeList[0].title }} {{ state.episodeList[0].itunes.summary}}
            </template>


            <template #channel-play>
                <button @click="()=>onPlayClick(state.episodeList[0])" class="main-play-btn">播放最新一集</button>
            </template>
        </ChannelBoard>

        <EpisodeItem 
            v-if="state.episodeList.length > 0"  
            v-for="item in state.episodeList.slice(0, state.limit)" 
            :key="item.guid"
            :episode="item"
            @playEpisode="onPlayClick"
        >
            <template #episode-img>
                <img class="h-[200px] main-img" :src="item.itunes.image" alt="episode-img">
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

            <template #episode-play-icon>
                <font-awesome-icon 
                    v-if="item.guid === state.nowPlaying.guid && state.globalIsPlay" 
                    :icon="['fas', 'stop']" 
                />
                <font-awesome-icon v-else :icon="['fas', 'play']" />
            </template>

            <template #episode-play-status>
                <span v-if="getStorageCurrTime(item.guid) >= item.itunes.duration"> 已播放 </span>
                <span v-else-if="getStorageCurrTime(item.guid) > 0"> 剩餘 </span>
                <span v-else> 播放</span>
            </template>


            <template #episode-play-time>
                <span v-if="getStorageCurrTime(item.guid) === 0 || getStorageCurrTime(item.guid) >= item.itunes.duration" class="text-xs font-semibold">{{secFormateStr(item.itunes.duration)}}</span>

                <span v-else class="flex flex-col w-[150px]">   
                    <time class="text-xs font-semibold mb-[.5rem]"> 
                        {{secFormateStr(item.itunes.duration - getStorageCurrTime(item.guid))}}  
                    </time>

                    <div class="flex-grow">
                        <Progress
                            :curr-time="parseInt(item.guid === state.nowPlaying.guid ? state.globalPlayingCurrTime : getStorageCurrTime(item.guid))" 
                            :duration="parseInt(item.itunes.duration)"
                        ></Progress>
                    </div>
                    
                </span>
                
            </template>

        </EpisodeItem>
    </section>
</template>