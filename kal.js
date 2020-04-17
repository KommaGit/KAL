const KAL = {

    /**
     * The data attribute prefix we use for our animation library
     * @type string
     */
    dataPrefix: 'kal',

    /**
     * Define the class we used to set the states of the animations
     */
    startStateClass: 'is-kal-start',
    endStateClass: 'is-kal-end',

    /**
     * Empty basket for putting the NodeElements in
     */
    elements: [],

    /**
     * Default options
     */
    options: {
        root: null,
        rootMargin: '-10% 0% -10% 0%',
        threshold: 0.5, // The visual percentage of component when animation is triggered
    },

    /**
     * Element default options
     */
    elementOptions: {
        once: true,
    },

    /** @type {IntersectionObserver} */
    intersectionObserver: null,

    init() {

        this.elements = document.querySelectorAll('*[data-'+ KAL.dataPrefix +']');
        if(this.elements.length === 0 ) return;

        if (!window.IntersectionObserver) {
            console.warn('IntersectionObserver is not supported');
            return;
        }

        KAL.createIntersectionObserver();
    },

    /**
     * Create the Intersection Observer
     * and append the KAL elements into it.
     */
    createIntersectionObserver() {

        KAL.intersectionObserver = new IntersectionObserver(KAL.onIntersection, {
            root: KAL.options.root,
            rootMargin: KAL.options.rootMargin,
            threshold: KAL.options.threshold,
        });

        KAL.elements.forEach((element) => {
            KAL.intersectionObserver.observe(element);
            element.classList.add(KAL.startStateClass);
        });
    },

    /**
     * IntersectionObserver callback
     * @param  {Array<IntersectionObserverEntry>} entries
     * @param  {IntersectionObserver} observer
     */
    onIntersection(entries, observer) {
        entries.forEach((entry) => {

            // When element's is in viewport and within threshold,
            // Trigger animation!
            if (entry.intersectionRatio >= KAL.options.threshold) {

                KAL.triggerAnimation(entry);

                if (KAL.getElementOption(entry.target, 'once')) {
                    observer.unobserve(entry.target);
                }
            } else if (!KAL.getElementOption(entry.target, 'once')) {

                // Reverse the animation if options is not once
                KAL.reverseAnimation(entry);
            }
        });
    },

    /**
     * Clear the intersection observer.
     */
    clearIntersectionObserver() {
      KAL.intersectionObserver.disconnect();
      KAL.intersectionObserver = null;
    },

    /**
     * Get an animation option of the element.
     *
     * @param element
     * @param attribute
     */
    getElementOption(element, attribute)
    {
        const option = element.getAttribute('data-'+ KAL.dataPrefix + '-' + attribute);

        if(option !== null){

            // Map the attributes values into the right type
            switch (attribute) {

                // Boolean attributes
                case 'once':
                    return (option == 'true');

                default:
                    return option;
            }
        }
        return KAL.elementOptions[attribute];
    },

    /**
     * Trigger animation
     * @param {IntersectionObserverEntry} entry
     */
    triggerAnimation(entry) {
        const element = entry.target;
        element.classList.remove(KAL.startStateClass);
        element.classList.add(KAL.endStateClass);
    },

    /**
     * Reverse animation
     * @param {IntersectionObserverEntry} entry
     */
    reverseAnimation(entry) {
        const element = entry.target;
        element.classList.add(KAL.startStateClass);
        element.classList.remove(KAL.endStateClass);
    },
}

export { KAL }