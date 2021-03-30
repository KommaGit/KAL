import { onMounted, onUnmounted, ref } from "vue";

export default function useBrowserTabVisible() {

    const isVisible = ref(true);

    const handleVisibility = () => {
        const { hidden } = document;

        // console[hidden ? "time" : "timeEnd"]("Hidden for:");

        isVisible.value = !document.hidden;
    };

    onMounted(() => {
        window.addEventListener("visibilitychange", handleVisibility);
    });

    onUnmounted(() => {
        window.removeEventListener("visibilitychange", handleVisibility);
    });

    return { isVisible };
}