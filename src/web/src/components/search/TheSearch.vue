<template>
<input ref={search} type="text" placeholder="Search" @click={makeSearch}>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const search = ref()

function makeSearch() {
    const value = search.value
}

onMounted(() => {})
</script>
