<template>
    <div class="flex flex-row mb-[2rem]">
        <slot name="channel-img"></slot>
        <section class="relative flex flex-col block-wrapper">

            <div class="flex flex-col inline-space">
                <slot name="channel-info"></slot>
            </div>
            
            <div class="inline-space">
                <slot name="channel-otherInfo"></slot>
            </div>

            <aside class="inline-space">
                <article class="line-clamp-3">
                    <slot name="channel-latest-episode"></slot>
                </article>
            </aside>

            <div class="absolute bottom-[1rem]">
                <slot name="channel-play"></slot>
            </div>
        </section>
    </div>
</template>