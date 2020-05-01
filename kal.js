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
        rootMargin: '-48px 0px -48px 0px', // offset from the edge of the intersection root
        threshold: 0, // The visual percentage of component when animation is triggered
    },

    /**
     * Element default options
     */
    elementOptions: {
        once: true,
    },

    /** @type {IntersectionObserver} */
    intersectionObserver: null,

    init: function () {

        if(window.IntersectionObserver === undefined) {
            console.warn('IntersectionObserver is not supported');
            return;
        }

        KAL.elements = document.querySelectorAll('*[data-'+ KAL.dataPrefix +']');
        if(KAL.elements.length === 0 ) return;

        KAL.createIntersectionObserver();
    },

    /**
     * Create the Intersection Observer
     * and append the KAL elements into it.
     */
    createIntersectionObserver: function () {

        KAL.intersectionObserver = new IntersectionObserver(KAL.onIntersection, {
            root: KAL.options.root,
            rootMargin: KAL.options.rootMargin,
            threshold: KAL.options.threshold,
        });

        KAL.elements.forEach(function (element) {
            KAL.intersectionObserver.observe(element);
            element.classList.add(KAL.startStateClass);
        });
    },

    /**
     * IntersectionObserver callback
     * @param  {Array<IntersectionObserverEntry>} entries
     * @param  {IntersectionObserver} observer
     */
    onIntersection: function (entries, observer) {
        entries.forEach(function (entry) {

            // When element's is in viewport and within threshold,
            // Trigger animation!
            if (entry.intersectionRatio > KAL.options.threshold) {

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
    clearIntersectionObserver: function () {
      KAL.intersectionObserver.disconnect();
      KAL.intersectionObserver = null;
    },

    /**
     * Get an animation option of the element.
     *
     * @param element
     * @param attribute
     */
    getElementOption: function (element, attribute)
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
    triggerAnimation: function (entry) {
        const element = entry.target;
        element.classList.remove(KAL.startStateClass);
        element.classList.add(KAL.endStateClass);
    },

    /**
     * Reverse animation
     * @param {IntersectionObserverEntry} entry
     */
    reverseAnimation: function (entry) {
        const element = entry.target;
        element.classList.add(KAL.startStateClass);
        element.classList.remove(KAL.endStateClass);
    },
};

export { KAL }