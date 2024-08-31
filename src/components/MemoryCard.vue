<script setup lang="ts">

import { Card } from '../MemoryTypes'

/* a single memory card component */

/* type for the prots of the memory card component */
/* const props = */ defineProps<{
    card: Card
    handleFlip: () => void
}>()

</script>
<template>
    <div v-if="card.active" class="w-full h-full cursor-pointer perspective" @click="handleFlip()">
        <div :class="[ 'card-inner', card.flipped ? 'is-flipped' : '' ]">
            <div class="card-front">
                <img :src="card.imageUrl" class="w-full h-full object-cover rounded-lg" />
            </div>
            <div class="card-back bg-gray-800 text-white flex items-center justify-center rounded-lg">
            </div>
        </div>
    </div>
    <div v-else class="w-32 h-32"></div>
</template>
<style scoped>
.memory-card {
    perspective: 1000px;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 500ms;
    transform-style: preserve-3d;
    user-select: none;
}

.is-flipped {
    transform: rotateY(180deg);
}

.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 0.5rem;
    border-width: 6px;;
    border-color: white;
}

@media screen and (max-width: 768px) {
    .card-front, .card-back {
        border-width: 4px;
    }
}

.card-back {
    transform: rotateY(180deg);
}
</style>