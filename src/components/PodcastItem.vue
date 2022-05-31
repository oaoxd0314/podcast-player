<script setup>
  import { reactive, inject, toRefs } from "vue";

  const mapStore = inject("mapStore");
  const { store } = mapStore;

  const state = reactive({
    ...toRefs(store),
  });

</script>

<template>
  <section class="flex flex-row mb-[1rem] rounded-[.5rem] hover:bg-zinc-600 group">
    <picture class="flex-shrink-0">
        <slot name="episode-img"></slot>
    </picture>
    <div class="p-[1rem] flex flex-row">
      <figure class="relative">

        <figcaption class="pb-[1rem items-center">
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
          <span v-on:click="" class="p-[.5rem] hover:text-purple-500 invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </span>
          <span v-on:click="" class="p-[.5rem] hover:text-purple-500 invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </span>
          <span v-on:click="" class="p-[.5rem] hover:text-purple-500 invisible group-hover:visible">
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </span>
      </div>
    </div>
  </section>
</template>

<style scoped>

.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
