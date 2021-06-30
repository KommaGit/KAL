import {onMounted, onUnmounted, ref} from "vue";
import {isset} from "./utils";

/**
 * Builder method to generate a step list for the threshold
 *
 * @param numSteps
 * @returns {[]}
 */
export function buildThresholdList(numSteps) {
    let thresholds = [];

    for (let i = 1.0; i <= numSteps; i++) {
        let ratio = i/numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

export default function useIntersectionObserver(target, observerOptions) {

    /**
     * Intersected values
     */
    const intersectionRatio = ref(0);
    const isIntersecting = ref(false);
    const isFullyInView = ref(false);

    /**
     * Define the class we used to set the states of the animations
     */
    const startStateClass = ref('is-kal-start');
    const endStateClass = ref('is-kal-end');

    /**
     * Default window intersection options
     *
     * - RootMargin: The offset of the root element when the observer should be trigger, in px or %
     *
     * - Threshold; The amount of steps when the callback should be fired.
     //  0 = Will only trigger if element goes in an out of view
     // [0, 0.5, 1] = Will trigger when target in viewport, 50% of the target is in viewport and when target 100% in viewport
     *
     */
    const defaultOptions = {
        root: null,
        rootMargin: '-48px 0px -48px 0px',
        threshold: buildThresholdList(10),
        once: true,
    };

    /**
     * Placeholder object where the default and given options are merged into
     *
     * @type {{}}
     */
    let options = {};

    /** Enable or disable auto observe calling */
    const autoObserve = ref(true);

    /** Enable for finding elements with data-kalable, within the given target */
    const findWithinTarget = ref(false);

    /** Delay between multiple entries in intersection event, only when find within target is true */
    const delayBetween = ref(100);

    /** Manual callback when intersection event has occurred */
    const callback = ref(null);
    const callbackBreaksIntersection = ref(false);

    let observer = IntersectionObserver;
    const observedElements = ref([]);

    const observe = () => {

        if(!target.value) {
            console.warn('Empty target');
            return;
        }

        if(!findWithinTarget.value) {
            target.value.classList.add(startStateClass.value);
            observedElements.value.push(target.value);
        }
        else if (isset(target.value.querySelectorAll)) {
            observedElements.value = Array.from(target.value.querySelectorAll('[data-kalable]'));
        }

        for(let observable of observedElements.value) {
            observable.classList.add(startStateClass.value);
            observer.observe(observable);
        }
    }

    /**
     * Unobserve all the (remaining) observed elements
     */
    const unobserve = () => {

        if (!observer) return;

        for(let observable of observedElements.value) {
            observer.unobserve(observable);
        }
    }

    /**
     * Unobserve a given element
     *
     * @param target
     */
    const unobserveTarget = (target) => {
        observer.unobserve(target);
        observedElements.value = observedElements.value.filter((observable) => {
            return observable !== target;
        });
    }

    onMounted(() => {

        if(window.IntersectionObserver === undefined) {
            console.warn('IntersectionObserver is not supported');
            return;
        }

        options = {...defaultOptions, ...observerOptions};
        observer = new IntersectionObserver(onIntersection, options);

        if(autoObserve.value) observe();
    });

    /**
     * IntersectionObserver callback
     * @param  {Array<IntersectionObserverEntry>} entries
     * @param  {IntersectionObserver} observer
     */
    const onIntersection = (entries, observer) => {

        entries.forEach(async function (entry, index) {

            // // If manual callback has been defined, use that
            if(callback.value !== null){
                callback.value(entry, observer);
                if(callbackBreaksIntersection.value) return;
            }

            intersectionRatio.value = entry.intersectionRatio;
            if (entry.intersectionRatio > 0) {

                isIntersecting.value = true;
                isFullyInView.value = entry.intersectionRatio >= 1;

                if(entries.length > 1) show(entry.target, (index * delayBetween.value));
                else show(entry.target, 0);

                if(!options.once && entry.target.dataset.kalOnce !== undefined) unobserveTarget(entry.target);
                if(options.once && entry.target.dataset.kalMulti === undefined) unobserveTarget(entry.target);
                return;
            }

            entry.target.classList.add(startStateClass.value);
            entry.target.classList.remove(endStateClass.value);
            isIntersecting.value = false;
        });
    }

    /**
     * Show a given target, with option delay for multiple entries in event
     *
     * @param target
     * @param delay
     */
    const show = (target, delay) => {
        setTimeout(function (){
            target.classList.remove(startStateClass.value);
            target.classList.add(endStateClass.value);
        }, delay);
    }

    onUnmounted(unobserve);

    return {
        callback,
        startStateClass,
        endStateClass,

        findWithinTarget,
        autoObserve,
        observe,
        unobserve,

        intersectionRatio,
        isIntersecting,
        isFullyInView,
    };
}