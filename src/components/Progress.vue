<script setup>
    import {defineProps} from 'vue'

    const props = defineProps({
        duration: Number,
        currTime: Number
    })

</script>

<template>
    <k-progress 
        type="line"
        :line-height="4"
        :format="()=>''"
        color='#A855F7'
        :percent="(props.currTime / props.duration)*100"
    >
    </k-progress>
</template>

<style>

.k-progress{
  margin: 0 !important;
  padding-right: 1rem !important;
}

.k-progress .k-progress-outer{
  margin: 0 !important;
  padding: 0 !important;
}

</style>