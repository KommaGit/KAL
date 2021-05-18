export default function useCookies() {



    /**
     * Set a cookie for name, value and optional days
     *
     * @param name
     * @param value
     * @param options
     */
    const setCookie = (name, value, options) => {

        options = {
            path: '/',
            // add other defaults here if necessary
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        if (options.days !== undefined) {

            const date = new Date();
            date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
            options.expires = date.toUTCString();

            delete options.days;
        }


        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }


    /**
     * Get a cookie
     *
     * @param name
     * @returns {string|null}
     */
    const getCookie = (name) => {

        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * Erase a cookie
     *
     * @param name
     */
    const eraseCookie  = (name) => {
        setCookie(name, '', {days: -1});
    }

    return {
        setCookie,
        getCookie,
        eraseCookie,
    };
}