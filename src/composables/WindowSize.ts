import { onMounted, onUnmounted, reactive } from 'vue';

/* reactive window size */
export function useWindowSize() {
    const size = reactive({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const listener = () => {
        size.width = window.innerWidth
        size.height = window.innerHeight
    }
    onMounted(() => {
        window.addEventListener('resize', listener)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', listener)
    })
    return size
}