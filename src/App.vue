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

<style>
@import './assets/base.css';

main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
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
    /* grid-template-columns: 1fr 1fr; */
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
