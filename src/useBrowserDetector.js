import {ref, computed, reactive} from "vue";

const browser = reactive({
    name: null,
    version: null,
    devices: {}
});

const unsupportedBrowsers = ref({
    Chrome: 70,
    Firefox: 60,
    IE: 11,
    Edge: 15,
    Opera: 50,
    Safari: 12
});

export default function useBrowserDetector() {

    debugger;
    if(browser.name === null) detectBrowser();

    function detectBrowser() {

        let ua = navigator.userAgent,
            tem,
            M =
                ua.match(
                    /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
                ) || [];

        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: "IE", version: tem[1] || "" };
        }

        if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) {
                return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        browser.name = M[0];
        browser.version = M[1];
        browser.devices = {
            android: /Android/i.test(ua),
            blackBerry: /BlackBerry/i.test(ua),
            windowsMobile: /IEMobile/i.test(ua),
            IOS: /iPhone|iPad|iPod/i.test(ua),
        }
    }


    /**
     * Checks if the current browser is Internet Explorer.
     */
    const isIE = computed(() => {
        return browser.name === 'IE';
    });

    /**
     * Checks if the current browser is Edge.
     */
    const isEdge = computed(() => {
        return browser.name === 'Edge';
    });

    /**
     * Checks if the current browser is from Microsoft (Edge
     * or Internet Explorer).
     */
    const isMicrosoft = computed(() => {
        return isIE.value || isEdge.value;
    });

    /**
     * Checks if the current browser is Firefox.
     */
    const isFirefox = computed(() => {
        return browser.name === 'Firefox';
    });

    /**
     * Checks if the current browser is Chrome.
     */
    const isChrome = computed(() => {
        return browser.name === 'Chrome';
    });

    /**
     * Checks if the current browser is Safari.
     */
    const isSafari = computed(() => {
        return browser.name === 'Safari';
    });

    /**
     * Checks if the current browser is from an Android device.
     */
    const isAndroid = computed(() => {
        return browser.devices.android;
    });

    /**
     * Checks if the current browser is from a BlackBerry device.
     */
    const isBlackBerry = computed(() => {
        return browser.devices.blackBerry;
    });

    /**
     * Checks if the current browser is from a Windows Mobile device.
     */
    const isWindowsMobile = computed(() => {
        return browser.devices.windowsMobile;
    });

    /**
     * Checks if the current browser is Mobile Safari.
     */
    const isIOS = computed(() => {
        return browser.devices.IOS;
    });

    /**
     * Checks if the current browser is a mobile browser.
     */
    const isMobile = computed(() => {
        return (
            isAndroid.value || isBlackBerry.value || isWindowsMobile.value || isIOS.value
        );
    })

    /**
     * Checks if the current browser is supported by
     */
    const isSupported = computed(() => {
        if (unsupportedBrowsers.value.hasOwnProperty(browser.name)) {
            if (+browser.version > unsupportedBrowsers.value[browser.name]) {
                return true;
            }
        }

        return false;
    });

    return {
        browser,
        unsupportedBrowsers,

        isIE,
        isEdge,
        isMicrosoft,
        isFirefox,
        isChrome,
        isSafari,
        isAndroid,
        isBlackBerry,
        isWindowsMobile,
        isIOS,
        isMobile,
        isSupported,
    };
}