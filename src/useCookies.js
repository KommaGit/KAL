export default function useCookies() {

    /**
     * Set a cookie for name, value and optional days
     *
     * @param name
     * @param value
     * @param days
     */
    const setCookie = (name, value, days) => {

        let cookieString = name + "=" + value

        if (days !== undefined) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            cookieString += "; expires=" + date.toGMTString();
        }

        cookieString += '; path=/';


        const host = location.host;
        const domainParts = host.split('.');

        // no "." in a domain - it's localhost or something similar
        if(domainParts.length !== 1) {

            domainParts.shift();
            cookieString += '; domain=.' + domainParts.join('.');
        }

        document.cookie = cookieString;
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
        setCookie(name, '', -1);
    }

    return {
        setCookie,
        getCookie,
        eraseCookie,
    };
}