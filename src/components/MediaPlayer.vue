<script setup>
import { reactive, toRefs, inject,onMounted,ref ,onUpdated} from 'vue';
import {secFormateTime,fetchAPI} from '../helper'
const mapStore = inject("mapStore");
const { store, setEpisodeList, setChannel } = mapStore;
const state = reactive({
    ...toRefs(store),
    isPlay: false,
    currTime: 0,
    volume:100,
    playedEp:'',
})

const audioRefs = ref('audio')

function playToggle() {
    state.isPlay = !state.isPlay
    if(state.isPlay){
        playEp()
    }
}

function playEp(){
    var audio = new Audio(state.playedEp);
    audio.play();
}

function getEpisode(){
    return fetchAPI('/episode',{episode:state.playedEp})
}

function next() {

}

function pre() {

}

function forward() {

}

function seekTo(e) {
    console.log(e)
    state.currTime = e.target.value
    // do change episode time
}

function onTimeDrag(e){
    state.currTime = e.target.value
}

function onVolumeDrag(e){
    state.volume = e.target.value
}


function loadEpisode(episode){
    state.playedEp = episode.enclosure.url
}

onUpdated(()=>{
    console.log('state change')

    if(Object.keys(state.nowPlaying).length > 0){
        if(state.nowPlaying.enclosure.url !== state.playedEp) loadEpisode(state.nowPlaying)
    }
})
</script>

<template>
    <div v-if="Object.keys(state.nowPlaying).length > 0" class="fixed bottom-0 w-full bg-slate-800 text-white flex flex-col">

        <audio ref="audio">
            <source>
        </audio>
        <div class="flex flex-col items-center relative">
            <input class="w-[100%]" type="range" min="1" :max="state.nowPlaying.itunes.duration" :value="state.currTime" @input="onTimeDrag" @change="seekTo">
            <time class="absolute top-4">
                <span>{{secFormateTime(state.currTime)}}</span> / <span>{{secFormateTime(state.nowPlaying.itunes.duration)}}</span>
            </time>
        </div>

        <div class="flex flex-row gap-4">
            <div class="flex flex-row flex-1">
                <picture>
                    <img class="h-[100px] aspect-auto p-[1rem]" :src="state.nowPlaying.itunes.image" alt="episode-pic">
                </picture>
                <div class="flex flex-col justify-center">
                    <p>{{state.nowPlaying.title}}</p>
                    <p>{{state.channel.title}}</p>
                </div>
            </div>
            <div class="flex-grow-[3] flex flex-row justify-center items-center gap-4">

                <span class="media-btn">
                    <font-awesome-icon :icon="['fas', 'backward-fast']" />
                </span>

                <span class="media-btn">
                    <font-awesome-icon :icon="['fas', 'rotate-left']" />
                </span>

                <span class="text-[2.5rem] media-btn" @click="playToggle">
                    <font-awesome-icon v-if="state.isPlay === false" :icon="['fas', 'circle-play']" />
                    <font-awesome-icon v-else :icon="['fas', 'circle-stop']" />
                </span>

                <span class="media-btn">
                    <font-awesome-icon :icon="['fas', 'rotate-right']" />
                </span>

                <span class="media-btn">
                    <font-awesome-icon :icon="['fas', 'forward-fast']" />
                </span>

            </div>
            <div class="float-right flex-1 flex justify-center items-center">

                <span class="m-[.5rem]">
                    <font-awesome-icon class="media-btn" v-if="state.volume === 0" :icon="['fas', 'volume-xmark']" />
                    <font-awesome-icon class="media-btn" v-else-if="state.volume < 50" :icon="['fas', 'volume-low']" />
                    <font-awesome-icon class="media-btn" v-else :icon="['fas', 'volume-high']" />
                </span>

                <input  type="range" min="0" max="100" :value="state.volume" @input="onVolumeDrag">
                
            </div>
        </div>


    </div>

</template>

<style lang="postcss" scoped>
    .media-btn {
        @apply cursor-pointer hover:text-purple-500
    }
</style>
