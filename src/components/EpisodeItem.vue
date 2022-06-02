<script setup>
  import {defineProps,defineEmits} from 'vue'

  const props = defineProps({
    episode: Object,
  })

  const emit = defineEmits(['playEpisode'])

  function play(episode){
    emit('playEpisode',episode)
  }

</script>

<template>
  <section class="inline-space flex flex-row rounded-[.5rem] hover:bg-zinc-600 group">
    <picture class="flex-shrink-0">
        <slot name="episode-img"></slot>
    </picture>
    <div class="block-wrapper flex flex-row">
      <figure class="relative">

        <figcaption class="inline-space items-center">
          <time>
              <slot name="episode-date"></slot>
          </time>
          <h2>
              <slot name="episode-name"></slot>
          </h2>
        </figcaption>

        <p class="line-clamp-3">
          <slot name="episode-describe"></slot>
        </p>

        <div class="absolute bottom-0 left-0 flex flex-row items-center">
            <button @click="()=>play(props.episode)" class="font-semibold text-sm p-[.5rem] ">
              <span  class="text-purple-500 mr-[.5rem]">
                <slot name="episode-play-icon"></slot>
              </span>
              <slot name="episode-play-status"></slot>
            </button>
            <slot name="episode-play-time"></slot>
        </div>
        
      </figure>

      <div class="px-[1rem] flex flex-row align-middle items-center">
          <span v-on:click="" class="episode-function-icon invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </span>
          <span v-on:click="" class="episode-function-icon invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </span>
          <span v-on:click="" class="episode-function-icon invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </span>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
  
</style>
