import { onMounted, onUnmounted, onBeforeMount, ref, computed } from "vue";
import throttle from "lodash.throttle"
import useWindowSize from "./useSizes";

export default function useScrollPosition(throttleDelay = 20) {

    const scrollX = ref(0);
    const scrollY = ref(0);

    function scrolled() {
        scrollX.value = window.pageXOffset;
        scrollY.value = window.pageYOffset;
    }

    const throttledScrolled = throttle(scrolled, throttleDelay);

    onBeforeMount(() => {
        scrolled();
    });

    onMounted(() => {
        window.addEventListener("scroll", throttledScrolled, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", throttledScrolled);
    });


    const {windowWidth, windowHeight} = useSizes();

    const percentageScrollX = computed(() => {
        return scrollX.value / (document.documentElement.scrollWidth - windowWidth.value);
    });

    const percentageScrollY = computed(() => {
        return scrollY.value / (document.body.clientHeight - windowHeight.value);
    });

    return {
        scrollX, scrollY,
        percentageScrollX, percentageScrollY,
    };
}