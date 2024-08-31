<script setup lang="ts">
import { computed, CSSProperties, ref } from 'vue';
import { Card, GameState, RunState } from '../MemoryTypes';
import { Util } from '../Util';
import GameStats from './GameStats.vue';
import MemoryCard from './MemoryCard.vue';
import { useWindowSize } from '../composables/WindowSize';

const props = defineProps<{
    gameSize: number
}>()


/* create the card models for the game and shuffle them */
const makeCards = (size: number) => {
    const cards: Card[] = []
    for (let i = 0, n = size * size / 2; i < n; i++) {
        const imageUrl = `image_${Util.zeroPadNumber(i + 1, 2)}.jpg`
        const id = "card_" + (i + 1)
        const model = {
            id: id,
            pairIndex: 0,
            flipped: true,
            active: true,
            imageUrl: imageUrl
        }
        // push two cards with the same id and image but different pairIndex
        cards.push(model)
        cards.push({ ...model, pairIndex: 1 })
    }
    Util.shuffle(cards)
    return cards
}


/* initialize the game state */
const gameState = ref<GameState>({
    cards: makeCards(props.gameSize),
    runState: RunState.STOPPED,
    moves: 0,
    misses: 0,
    badMisses: 0,
    seenCards: new Set<string>()
})

/* remember the timeout id for the checkForMatch function, so we can 
 * cancel pending timeouts */
const timeoutId = ref(0)

/* for poor man's responsive design */
const windowSize = useWindowSize()

/* func to reinitialize the gameState for a new game */
const newGame = () => {
    const newGameState = { ...gameState.value }
    newGameState.runState = RunState.STARTED
    newGameState.moves = newGameState.misses = newGameState.badMisses = 0
    newGameState.cards = makeCards(props.gameSize)
    newGameState.seenCards.clear()
    gameState.value = newGameState
}

/* flip the card at index from the click event */
const flipCard = (index: number) => {
    const visibleCards = gameState.value.cards.filter(card => !card.flipped && card.active)
    if (visibleCards.length >= 2) {
        return
    }

    if (!gameState.value.cards[index].flipped) {
        return
    }
    const newGameState = { ...gameState.value }
    newGameState.cards[index].flipped = !newGameState.cards[index].flipped
    gameState.value = newGameState
}

/* check if two cards are visible and if they match and
 * either log a hit or a miss */
const checkForMatch = () => {
    const newGameState = { ...gameState.value }
    /* when 2 cards are turned around, check if they match or not */
    const visibleCards = newGameState.cards.filter(card => !card.flipped && card.active)
    if (visibleCards.length == 2) {
        const c1 = visibleCards[0]
        const c2 = visibleCards[1]
        newGameState.moves++
        if (c1.id == c2.id) {
            c1.active = false;
            c2.active = false;
        } else {
            newGameState.misses++
            c1.flipped = true
            c2.flipped = true
            if (newGameState.firstCard) {
                // chance to uncover a card missed here
                const otherCardKey = newGameState.firstCard.id + "@" + (newGameState.firstCard.pairIndex == 0 ? 1 : 0)
                if (newGameState.seenCards.has(otherCardKey)) {
                    newGameState.badMisses++
                }
            }
        }
        newGameState.seenCards.add(c1.id + "@" + c1.pairIndex)
        newGameState.seenCards.add(c2.id + "@" + c2.pairIndex)
    }
    /* game is over when all cards are inactive */
    const activeCards = newGameState.cards.filter(card => card.active)
    newGameState.runState = activeCards.length == 0 ? RunState.STOPPED : RunState.STARTED
    newGameState.firstCard = visibleCards.length == 1 ? visibleCards[0] : undefined  // remember the first card for bad misses
    gameState.value = newGameState
}

/* handle the click (=flip) of a card */
const handleFlip = (index: number) => () => {
    switch (gameState.value.runState) {
        case RunState.STOPPED:
            break
        case RunState.STARTED:
            /* flip the card around right away*/
            flipCard(index)
            /* delete old timeout */
            if (timeoutId.value) {
                clearTimeout(timeoutId.value);
            }
            /* check for a match after the cards were revealed */
            timeoutId.value = setTimeout(checkForMatch, 500)
            break
    }
}

const styles = computed(() => { 
    const gridCols = `repeat(${props.gameSize}, minmax(0, 128px))`
    return {
        "gridTemplateColumns": gridCols,
        "gridTemplateRows": gridCols,
        "alignContent": "center",
        "gap": windowSize.width < 600 || windowSize.height < 800 ? "8px" : "16px"
    } as CSSProperties
})

</script>

<template>
    <div class="flex flex-col grow h-1 items-center justify-center p-3">
        <template v-if="gameState.runState == RunState.STARTED">
            <div class="grow shrink h-1 grid gap-6" :style="styles">
                <MemoryCard v-for="(card,i) in gameState.cards" :card="card" :handleFlip="handleFlip(i)" />
            </div>
        </template>
        <template v-else>
            <button class="button" @click="newGame()">Start new {{gameSize}} x {{gameSize}} Game</button>
        </template>
        <GameStats :badMisses="gameState.badMisses" :moves="gameState.moves" :misses="gameState.misses"></GameStats>
    </div>
</template>
