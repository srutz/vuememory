<script setup lang="ts">
import { ref } from "vue"
import MemoryGame from "./components/MemoryGame.vue"
import ModalDialog from "./components/ModalDialog.vue"
import Menubar from "./components/Menubar.vue"

const gameSize = ref<{ size: number, key: number }>({
    size: 4,
    key: new Date().getTime()
})

const aboutShown = ref(false)
const onMenuAction = (action: string) => {
    switch (action) {
            case "game2":
                gameSize.value = { size: 2, key: new Date().getTime() }
                break
            case "game4":
                gameSize.value = { size: 4, key: new Date().getTime() }
                break
            case "game6":
                gameSize.value = { size: 6, key: new Date().getTime() }
                break
            case "about":
                aboutShown.value = true
                break
        }}

</script>

<template>
    <div class="grow flex flex-col h-1">
        <Menubar :handleClick="onMenuAction" />
        <div class="flex flex-col grow h-1 justify-center items-center bg-indigo-400 relative">
            <MemoryGame :key="gameSize.key" :gameSize="gameSize.size"></MemoryGame>
        </div>
        <ModalDialog msg="h1i baby" :show="aboutShown" :onClose="() => { aboutShown=false }" title="About Vuememory">
            <p>Small Vue.js Memory Game. (For demo purposes only.)</p>
            <p>by Stepan Rutz.</p>
            <p>Images are from Pexels.com.</p>
        </ModalDialog>
    </div>
</template>./components/ModalDialog.vue
