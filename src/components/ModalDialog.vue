<script setup lang="ts">
import { defineProps } from 'vue';

/* const props = */ defineProps<{
    show: boolean
    title: string
    onClose: () => void
}>()


</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg" style="width: calc(min(800px,60vw))">
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-lg font-semibold">{{title}}</h2>
                <button @click="onClose()" class="text-gray-500 hover:text-gray-800">
                    &times;
                </button>
            </div>
            <div class="p-4">
                <slot></slot>
            </div>
            <div class="flex justify-end p-4 border-t">
                <button @click="onClose()" class="button">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>