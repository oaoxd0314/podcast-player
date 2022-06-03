<script setup>
import { reactive, toRefs, inject, ref, onUpdated, watch} from 'vue';
import {secFormateTime,setStorageCurrTime,getStorageCurrTime} from '../helper'
const mapStore = inject("mapStore");
const { store, setPlayEpisode,setGlobalCurrTime,setGlobalIsPlay } = mapStore;

const state = reactive({
    ...toRefs(store),
    isMute: false,
    volume:100,
    playedEp:'',
    nextEp: {},
    preEp: {},
})

const audioEle = ref(null)

// audio state change
function setUpAudio(episode){
    audioEle.value.src= episode.enclosure.url
    audioEle.value.load()
}

function setAudioTime(time){
    audioEle.value.currentTime = time
}

function setAudioVolume(vol){
    audioEle.value.volume = vol/100
}
// end of audio state change


// local state change
function setLocalVolume(vol){
    state.volume = vol
}
//end of local stage change

// change storage state
function storeCurrTimeToStorage(time){
    setStorageCurrTime(state.nowPlaying.guid,time)
}
//
// trigger function  
async function playEp(){
    let time =  getStorageCurrTime(state.nowPlaying.guid)

    if(time !== 0){
        setAudioTime(time)
    } else{
        storeCurrTimeToStorage(0)
    }

    audioEle.value.play();
    setGlobalIsPlay(true)
}

async function stopEp(){
    audioEle.value.pause()
    setGlobalIsPlay(false)
    storeCurrTimeToStorage(state.globalPlayingCurrTime)
}

function playToggle() {
    state.globalIsPlay 
        ? stopEp()
        : playEp()
}

function playNextEp() {
    if(state.nextEp) setPlayEpisode(state.nextEp)
}

function playPreEp() {
    if(state.preEp) setPlayEpisode(state.preEp)
}

function seekTo(e) {
    setGlobalCurrTime(e.target.value)
    setAudioTime(e.target.value)
}

function onVolumeDrag(e){
    setLocalVolume(e.target.value)
    setAudioVolume(e.target.value)
}

function volumeToggle() {
    let vol =  state.volume > 0 ? 0 : 100
    setLocalVolume(vol)
    setAudioVolume(vol)
}
//  end of trigger function

// call like event listener
function onAudioTImeUpdate(){
    setGlobalCurrTime(audioEle.value.currentTime)
}
// --- end of call like event listener

// core function
function loadEpisode(episode){
    let nowIdx = state.episodeList.findIndex(ep=>ep.guid === episode.guid)
    state.nextEp = state.episodeList[nowIdx-1]
    state.preEp =  state.episodeList[nowIdx+1]
    state.playedEp = episode.enclosure.url
    setUpAudio(episode)
}

onUpdated(()=>{
    if(Object.keys(state.nowPlaying).length > 0){
        // receive global playing target to actully play&load ep
        if(state.nowPlaying.enclosure.url !== state.playedEp){
            console.log('should play')
            loadEpisode(state.nowPlaying)
            playEp()
        }

        // when ep ended
        if(audioEle.value.ended && state.nextEp !== undefined ){
            storeCurrTimeToStorage(state.globalPlayingCurrTime) // set ended ep to storage
            setPlayEpisode(state.nextEp) // play next ep => change global playing 
        }
    }
})

watch(
    // watch is play 
    ()=>{
        return state.globalIsPlay
    },
    ()=>{
        if(state.globalIsPlay === false)  stopEp()
        else{
            playEp()
            console.log('is play')
        }
    }
)
//
</script>

<template>
    <div v-if="Object.keys(state.nowPlaying).length > 0" class="fixed bottom-0 w-full bg-slate-800 text-white flex flex-col">
        <!-- audio -->
        <audio hidden ref="audioEle" @timeupdate="onAudioTImeUpdate">
            <source :src="state.playedEp">
        </audio>
        <!-- end of audio-->

        <div class="flex flex-col items-center relative">
            <input class="w-[100%]" type="range" min="1" :max="state.nowPlaying.itunes.duration" :value="state.globalPlayingCurrTime" @input="seekTo">
            <time class="absolute top-4">
                <span>{{secFormateTime(state.globalPlayingCurrTime)}}</span> / <span>{{secFormateTime(state.nowPlaying.itunes.duration)}}</span>
            </time>
        </div>

        <div class="flex flex-row gap-4 relative">
            <div class="flex flex-row flex-1">
                <picture>
                    <img class="h-[100px] aspect-auto block-wrapper" :src="state.nowPlaying.itunes.image" alt="episode-pic">
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
                    <font-awesome-icon v-if="state.globalIsPlay === false" :icon="['fas', 'circle-play']" />
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
