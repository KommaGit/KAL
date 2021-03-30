import {onMounted, onUnmounted, onBeforeMount, ref, nextTick} from "vue";
import throttle from "lodash/throttle"

export default function useSizes() {

    const windowWidth = ref(0);
    const windowHeight = ref(0);

    function resize() {
        windowWidth.value = window.innerWidth;
        windowHeight.value = window.innerHeight;
    }

    const throttledResize = throttle(resize, 100);

    onBeforeMount(() => {
        resize();
    });

    onMounted(async () => {
        window.addEventListener("resize", throttledResize, { passive: true });

        await nextTick();
        resize();
    });

    onUnmounted(() => {
        window.removeEventListener("resize", throttledResize);
    });

    return {
        windowWidth, windowHeight,
    };
}