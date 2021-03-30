import { onMounted, onUnmounted, ref } from "vue";

export default function useMousePositions() {
    const mouseX = ref(0);
    const mouseY = ref(0);

    function updatePosition(event) {
        mouseX.value = event.clientX;
        mouseY.value = event.clientY;
    }

    onMounted(() => {
        window.addEventListener('mousemove', updatePosition);
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', updatePosition);
    });

    return { mouseX, mouseY };
}