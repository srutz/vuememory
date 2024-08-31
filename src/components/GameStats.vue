<script setup lang="ts">
/*
 * component that shows the game-stats as overlay
 */

/* const props = */ defineProps<{
    moves: number
    misses: number
    badMisses: number
}>()

</script>
<template>
    <div class="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 text-white text-sm flex flex-col rounded-lg ">
        <div class="grid grid-cols-[auto,auto] grid-cols-2 gap-x-4">
            <div>Moves:</div>
            <div class="text-right">{{moves}}</div>
            <div>Misses:</div>
            <div class="text-right">{{misses}}</div>
            <div>Bad-Misses:</div>
            <div class="text-right">{{badMisses}}</div>
        </div>
    </div>

</template>
