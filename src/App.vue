<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import MediaPlayer from './components/MediaPlayer.vue';
  import NavbarVue from './components/Navbar.vue';
  import {provide} from 'vue'
  import store from './store'

  provide("mapStore", store);
</script>

<template>

  <header>
    <NavbarVue />
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="h-[120px]" >
    <MediaPlayer />
  </footer>
  
</template>

<style lang="postcss">
@import './assets/base.css';

#app{
  @apply w-full
}

main {
  @apply max-w-[1280px] font-normal my-0 mx-auto p-[2rem]
}

header {
  line-height: 1.5;
}

.main-play-btn{
 @apply font-semibold bg-purple-500 text-white p-2 w-[200px] text-lg text-center rounded-md hover:cursor-pointer 
} 

.main-title{
  @apply text-3xl
}

.block-wrapper{
  @apply p-[1rem]
}

.inline-space{
  @apply mb-[1rem]
}

.episode-function-icon{
  @apply p-[.5rem] hover:text-purple-500
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  main {
    display: grid;
    padding: 0 2rem;
  }
}
</style>
