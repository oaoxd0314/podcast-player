<script setup>
import { onMounted, reactive, inject, toRefs } from "vue";
import ChannelBoard from '../components/ChannelBoard.vue';
import EpisodeItem from '../components/EpisodeItem.vue'
import { fetchAPI,toYYYYMMDD,secFormateStr,getEpStatus,setEpStatus,getStorage } from '../helper'
import ChannelBoardLoading from "../components/lodingView/channelBoardLoading.vue";
import EpisodeListLoading from "../components/lodingView/episodeListLoading.vue";

const mapStore = inject("mapStore");
const { store ,setEpisodeList ,setChannel ,setPlayEpisode } = mapStore;

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
    setPlayEpisode(episode)
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

function getStorageCurrTime(guid){
    console.log(guid)
    let epStatus = getEpStatus(guid)
    return ('currTime' in epStatus) ? epStatus.currTime : 0
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getFeed(RSS_URL)
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

        <EpisodeItem v-if="state.episodeList.length > 0"  v-for="item in state.episodeList.slice(0, state.limit)" :key="item.id">

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

            <template #episode-play>
                <div class="absolute bottom-0 left-0 flex flex-row items-center">
                    <button @click="()=>onPlayClick(item)" class="font-semibold text-sm p-[.5rem] ">
                        <span class=" text-purple-500 mr-[.5rem] ">
                            <font-awesome-icon :icon="['fas', 'play']" />
                        </span>
                        <span> 播放</span>
                    </button>

                    <span v-if="getStorageCurrTime(item.guid) > 0" >{{getStorageCurrTime(item.guid)}} </span>
                    <span v-else class="text-xs font-semibold">{{secFormateStr(item.itunes.duration)}}</span>
                </div>
            </template>

        </EpisodeItem>
    </section>
</template>