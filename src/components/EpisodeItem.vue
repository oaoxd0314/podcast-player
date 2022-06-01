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

        <slot name="episode-play"></slot>
        
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
