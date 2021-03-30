export default function useScrollTo() {

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
        scrollToElement,
        scrollToNextElement,
        scrollToNode,
    };
}