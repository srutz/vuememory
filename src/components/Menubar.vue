<script setup lang="ts">

defineProps<{
    handleClick: (action: string) => void
}>()

</script>

<template>
    <div class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-lg font-bold select-none">React-Memory</div>
            <nav class="flex space-x-4">
                <a href="#" class="text-gray-300 hover:text-white" @click="handleClick('game2')">Game
                    2x2</a>
                <a href="#" class="text-gray-300 hover:text-white" @click="handleClick('game4')">Game
                    4x4</a>
                <a href="#" class="text-gray-300 hover:text-white" @click="handleClick('game6')">Game
                    6x6</a>
                <a href="#" class="text-gray-300 hover:text-white" @click="handleClick('about')">About</a>
            </nav>
        </div>
    </div>
</template>