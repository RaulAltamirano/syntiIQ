import { onMounted, ref } from 'vue';
import { useThemeStore } from '../../store/ThemeStore';
import { storeToRefs } from 'pinia';

export default {
  name: 'AnimatedBackground',
  components: {
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    const mousePosition = ref({ x: 0, y: 0 })

    const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
      mousePosition.value = {
        x: event.clientX,
        y: event.clientY
      }
    }
    
    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
    })
    
    return {
        isDark,
        mousePosition,
        handleMouseMove,

    }
  },
};
