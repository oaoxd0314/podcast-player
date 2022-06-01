<script setup>
import { reactive, toRefs, inject,onMounted,ref ,onUpdated} from 'vue';
import {secFormateTime,fetchAPI} from '../helper'
const mapStore = inject("mapStore");
const { store, setPlayEpisode } = mapStore;
const state = reactive({
    ...toRefs(store),
    isPlay: false,
    currTime: 0,
    isMute: false,
    volume:100,
    playedEp:'',
    nextEp: {},
    preEp: {},
})

const audioEle = ref(null)

// audio state change
function setUpEp(episode){
    audioEle.value.src= episode.enclosure.url
    audioEle.value.load()
    
}

function playEp(){
    audioEle.value.load()
    audioEle.value.play();
    state.isPlay = true
    console.log(audioEle.value.duration)
}

function stopEp(){
    audioEle.value.pause()
    state.isPlay = false
}

function setEpTime(time){
    audioEle.value.currentTime = time
}

function setEpVolume(vol){
    audioEle.value.volume = vol/100
}

// end of state change

// action 
function playToggle() {
    !state.isPlay ? playEp() : stopEp()
}

function playNextEp() {
    if(state.nextEp){
        let ep = state.nextEp
        setPlayEpisode(ep)
    }
}

function playPreEp() {
    if(state.preEp){
        let ep = state.preEp
        setPlayEpisode(ep)
    }
}

function loadEpisode(episode){
    let nowIdx = state.episodeList.findIndex(ep=>ep.guid === episode.guid)
    state.nextEp = state.episodeList[nowIdx-1]
    state.preEp =  state.episodeList[nowIdx+1]
    state.playedEp = episode.enclosure.url

    console.log(episode.enclosure.url)

    setUpEp(episode)
}

function seekTo(e) {
    state.currTime = e.target.value
    setEpTime(e.target.value)
}

function onTimeUpdate(e){
    state.currTime = audioEle.value.currentTime
}

function onVolumeDrag(e){
    state.volume = e.target.value
    setEpVolume(e.target.value)
}

function volumeToggle(params) {
    let vol =  state.volume > 0 ? 0 : 100
    state.volume = vol
    setEpVolume(vol)
}

onUpdated(()=>{
    if(Object.keys(state.nowPlaying).length > 0){
        // console.log('state change')

        // receive global playing target to 
        if(state.nowPlaying.enclosure.url !== state.playedEp){
            loadEpisode(state.nowPlaying)
            playEp()
        }

        // play next ep => change global playing let other case(only) to change
        if(audioEle.value.ended && state.nextEp !== undefined ){
            setPlayEpisode(state.nextEp)
            // stopEp()
            state.isPlay = false
        }
    }
})

console.log(state.isPlay)
</script>

<template>
    <div v-if="Object.keys(state.nowPlaying).length > 0" class="fixed bottom-0 w-full bg-slate-800 text-white flex flex-col">

        <!-- audio -->
        <audio hidden ref="audioEle" @timeupdate="onTimeUpdate">
            <source :src="state.playedEp">
        </audio>
        <!-- end of audio-->

        <div class="flex flex-col items-center relative">
            <input class="w-[100%]" type="range" min="1" :max="state.nowPlaying.itunes.duration" :value="state.currTime" @input="seekTo">
            <time class="absolute top-4">
                <span>{{secFormateTime(state.currTime)}}</span> / <span>{{secFormateTime(state.nowPlaying.itunes.duration)}}</span>
            </time>
        </div>

        <div class="flex flex-row gap-4 relative">
            <div class="flex flex-row flex-1">
                <picture>
                    <img class="h-[100px] aspect-auto p-[1rem]" :src="state.nowPlaying.itunes.image" alt="episode-pic">
                </picture>
                <div class="flex flex-col justify-center">
                    <p>{{state.nowPlaying.title}}</p>
                    <p>{{state.channel.title}}</p>
                </div>
            </div>

            <div class="flex-1 flex flex-row justify-center items-center gap-4">
                <span class="media-btn" @click="playPreEp">
                    <font-awesome-icon :icon="['fas', 'backward-fast']" />
                </span>

                <span class="text-[2.5rem] media-btn" @click="playToggle">
                    <font-awesome-icon v-if="state.isPlay === false" :icon="['fas', 'circle-play']" />
                    <font-awesome-icon v-else :icon="['fas', 'circle-stop']" />
                </span>

                <span class="media-btn" @click="playNextEp">
                    <font-awesome-icon :icon="['fas', 'forward-fast']" />
                </span>
            </div>

            <div class="flex-1 flex justify-end items-center">

                <div class="pr-[1rem]">
                    <span @click="volumeToggle" class="m-[.5rem]">
                        <font-awesome-icon class="media-btn" v-if="state.volume === 0" :icon="['fas', 'volume-xmark']" />
                        <font-awesome-icon class="media-btn" v-else-if="state.volume < 50" :icon="['fas', 'volume-low']" />
                        <font-awesome-icon class="media-btn" v-else :icon="['fas', 'volume-high']" />
                    </span>

                    <input type="range" min="0" max="100" :value="state.volume" @input="onVolumeDrag">
                </div>
                
            </div>
        </div>


    </div>

</template>

<style lang="postcss" scoped>
    .media-btn {
        @apply cursor-pointer hover:text-purple-500
    }

    .media-btn-disable{
        @apply text-gray-600 hover:bg-transparent !important
    }
</style>
