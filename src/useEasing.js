const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

/**
 *  For an example of these easing functions.
 *  Take a look at;
 *  @link https://easings.net
 */
export default function useEasing() {

    const easeInSine = (x) => {
        return 1 - cos((x * PI) / 2);
    }
    const easeOutSine = (x) => {
        return sin((x * PI) / 2);
    }
    const easeInOutSine = (x) => {
        return -(cos(PI * x) - 1) / 2;
    }

    const easeInQuad = (x) => {
        return x * x;
    }
    const easeOutQuad = (x) => {
        return 1 - (1 - x) * (1 - x);
    }
    const easeInOutQuad = (x) => {
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    }

    const easeInCubic = (x) => {
        return x * x * x;
    }
    const easeOutCubic = (x) => {
        return 1 - pow(1 - x, 3);
    }
    const easeInOutCubic = (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    }

    const easeInQuart = (x) => {
        return x * x * x * x;
    }
    const easeOutQuart = (x) => {
        return 1 - pow(1 - x, 4);
    }
    const easeInOutQuart = (x) => {
        return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    }

    const easeInQuint = (x) => {
        return x * x * x * x * x;
    }
    const easeOutQuint = (x) => {
        return 1 - pow(1 - x, 5);
    }
    const easeInOutQuint = (x) => {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    }

    const easeInExpo = (x) => {
        return x === 0 ? 0 : pow(2, 10 * x - 10);
    }
    const easeOutExpo = (x) => {
        return x === 1 ? 1 : 1 - pow(2, -10 * x);
    }
    const easeInOutExpo = (x) => {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? pow(2, 20 * x - 10) / 2
                    : (2 - pow(2, -20 * x + 10)) / 2;
    }

    const easeInCirc = (x) => {
        return 1 - sqrt(1 - pow(x, 2));
    }
    const easeOutCirc = (x) => {
        return sqrt(1 - pow(x - 1, 2));
    }
    const easeInOutCirc = (x) => {
        return x < 0.5
            ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
            : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    }

    const easeInBack = (x) => {
        return c3 * x * x * x - c1 * x * x;
    }
    const easeOutBack = (x) => {
        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    }
    const easeInOutBack = (x) => {
        return x < 0.5
            ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    const easeInElastic = (x) => {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    }
    const easeOutElastic = (x) => {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    }
    const easeInOutElastic = (x) => {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
                    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

    const bounceOut = (x) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }

    const easeInBounce = (x) => {
        return 1 - bounceOut(1 - x);
    }
    const easeOutBounce = (x) => {
        return bounceOut(x);
    }
    const easeInOutBounce = (x) => {
        return x < 0.5
            ? (1 - bounceOut(1 - 2 * x)) / 2
            : (1 + bounceOut(2 * x - 1)) / 2;
    }

    return {
        easeInQuad,
        easeOutQuad,
        easeInOutQuad,
        easeInCubic,
        easeOutCubic,
        easeInOutCubic,
        easeInQuart,
        easeOutQuart,
        easeInOutQuart,
        easeInQuint,
        easeOutQuint,
        easeInOutQuint,
        easeInSine,
        easeOutSine,
        easeInOutSine,
        easeInExpo,
        easeOutExpo,
        easeInOutExpo,
        easeInCirc,
        easeOutCirc,
        easeInOutCirc,
        easeInBack,
        easeOutBack,
        easeInOutBack,
        easeInElastic,
        easeOutElastic,
        easeInOutElastic,
        easeInBounce,
        easeOutBounce,
        easeInOutBounce,
    };
}