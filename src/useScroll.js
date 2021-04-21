import { onMounted, onUnmounted, onBeforeMount, ref, computed } from "vue";
import throttle from "lodash.throttle"
import useSizes from "./useSizes";

export default function useScroll(throttleDelay = 16) {

    const scrollX = ref(0);
    const scrollY = ref(0);

    const scrollDown = ref(true);
    const scrollUp = ref(false);

    function scrolled() {

        // Temporary store vertical scroll direction
        const scrollYPosition = window.pageYOffset;

        // Determine scroll direction
        // So if Y position is higher or lower then the previous
        scrollDown.value = (scrollYPosition > scrollY.value);
        scrollUp.value = !scrollDown.value;

        scrollX.value = window.pageXOffset;
        scrollY.value = scrollYPosition;
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

    const isVerticalFullyInViewport = (el) => {

        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight
        );
    }

    const isInViewport = (el) => {

        const rect = el.getBoundingClientRect();

        const verticalInView = (rect.top <= (windowHeight.value)) && ((rect.top + rect.height) >= 0);
        const horizontalInView = (rect.left <= windowWidth.value) && ((rect.left + rect.width) >= 0);

        return {
            vertical: verticalInView,
            horizontal: horizontalInView,
            both: (verticalInView && horizontalInView)
        }
    }

    const scrollToElement = (selector, scrollOptions = null) => {
        scrollToNode(document.querySelector(selector), scrollOptions);
    }

    const scrollToNextElement = (selector, skipElements = 1, scrollOptions = null) => {

        let scrollToElement = document.querySelector(selector);

        for(let i = 0; i < skipElements; i++) {
            if(scrollToElement === undefined) {
                console.warn('Scroll to element or next sibling not found.');
                return;
            }
            scrollToElement = scrollToElement.nextElementSibling;
        }

        scrollToNode(scrollToElement, scrollOptions);
    }

    const scrollToNode = (node, scrollOptions = null) => {

        if(node === undefined) {
            console.warn('Scroll to element not found.');
            return;
        }

        if(scrollOptions === null) scrollOptions = {behavior: "smooth", block: "start"};

        node.scrollIntoView(scrollOptions);
    }

    return {
        scrollX, scrollY,
        percentageScrollX, percentageScrollY,

        scrollDown, scrollUp,

        isVerticalFullyInViewport,
        isInViewport,

        scrollToElement,
        scrollToNextElement,
        scrollToNode,
    };
}