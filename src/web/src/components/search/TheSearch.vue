<template>
<input ref="search" type="text" placeholder="Search">
<button @click="makeSearch">Search</button>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"

const search = ref()
const searchStatus = ref()

function makeSearch(event: MouseEvent) {
    event.preventDefault()
    const searchTerm = search.value.value

    if (!searchTerm) {
        console.log("No search term")
        return
    }

    const settings = {
        method: "POST",
        body: JSON.stringify({ message: searchTerm }),
        headers: {
            "Content-Type": "application/json",
        },
    }

    fetch(import.meta.env.VITE_API_URL + "/send", settings)
        .then((response) => {
            console.log("Fetch response", response)
            searchStatus.value = {
                error: false,
                message: response
            }
        })
        .catch((error) => {
            searchStatus.value = {
                error: true,
                message: error
            }
        })
}

watch(searchStatus, async (oldValue, newValue) => {
    console.log("=======================")
    console.log("The search watch")
    console.log("New value:", newValue)
    console.log("Old value:", oldValue)
}, { deep: true })

onMounted(() => {})
</script>
