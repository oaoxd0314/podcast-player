<script setup>
import { useRoute} from 'vue-router';
import router from '../router'

const route = useRoute();

function goBack(){
    router.go(-1)
}

</script>

<template>
    <nav v-if="route.params.epid && route.params.epid.length>0 " class="fixed top-4 left-4 w-screen z-[999]">
      <span @click="goBack" class="p-[.5rem] px-[.75rem] rounded-[5px] cursor-pointer hover:bg-zinc-600">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </span>
    </nav>
</template>

<style>
</style>