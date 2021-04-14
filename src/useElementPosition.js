import { onMounted, onUnmounted, onBeforeMount, ref } from "vue";
import throttle from "lodash/throttle"
import useSizes from "./useSizes";
import {interpolation} from "./utils";

export default function useElementPosition() {

    const {windowHeight} = useSizes();

    const observable = ref(null);

    const aboveViewport = ref(false);
    const belowViewport = ref(true);
    const relativeViewportPosition = ref(0);

    /**
     * Get the element position related to the viewport.
     *
     * Where 0 is when the top of the element is at the bottom of the screen (before moving in).
     * And 1 is when th bottom of the element is at the top of the screen (just moved out).
     */
    const elementRelatedInViewport = () => {

        if(!observable.value) return;
        const elementBoundingClient = observable.value.getBoundingClientRect();

        if(elementBoundingClient.top > windowHeight.value) {
            aboveViewport.value = false;
            belowViewport.value = true;
            relativeViewportPosition.value = 0;
            return;
        }
        if(elementBoundingClient.top < (observable.value.clientHeight * -1)) {
            aboveViewport.value = true;
            belowViewport.value = false;
            relativeViewportPosition.value = 1;
            return;
        }

        aboveViewport.value = false;
        belowViewport.value = false;

        relativeViewportPosition.value = interpolation(elementBoundingClient.top, windowHeight.value, observable.value.clientHeight * -1, 0, 1);
    }

    // Use throttled of 16ms, this will result in 60fps
    let scrolled = throttle(elementRelatedInViewport, 16);

    onBeforeMount(() => {
        elementRelatedInViewport();
    });

    onMounted(() => {
        window.addEventListener("scroll", scrolled, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", scrolled);
    });

    return {
        observable,

        aboveViewport,
        belowViewport,
        relativeViewportPosition,
    };
}