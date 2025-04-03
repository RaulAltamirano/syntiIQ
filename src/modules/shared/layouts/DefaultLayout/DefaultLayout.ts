import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../../store/ThemeStore';
import AnimatedBackground from '../../components/Backgound/AnimatedBackground.vue';
import { useScroll } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import TitleCard from '../../components/TitleCard/TitleCard.vue';
import { useMotion } from '@vueuse/motion';
import Navbar from '../../components/Navbar/Navbar.vue';

export default defineComponent({
  name: "DefaultLayout",
  components: {
    TitleCard,
    AnimatedBackground,
    Navbar
  },
  setup() {

    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    const navbar = ref(null);
    const animatedBackground = ref(null);
    const routerView = ref(null);

    const route = useRoute()

    const scrollProgress = ref(0)
    const showScrollTop = ref(false)
    const { y } = useScroll(window, { throttle: 100 })

    const updateScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      scrollProgress.value = (winScroll / height) * 100
      showScrollTop.value = winScroll > 300

    }

    const currentRouteName = computed(() => {
      return route.meta.title || route.name || 'Dashboard'
    })
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    useMotion(navbar, {
      initial: { y: -100, opacity: 0 },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
        },
      },
    });

    // Animación para el AnimatedBackground
    useMotion(animatedBackground, {
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: { duration: 0.5 },
      },
    });

    // Animación para el RouterView
    useMotion(routerView, {
      initial: { opacity: 0, y: 20 },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 100,
        },
      },
    });

    watch(y, () => {
      updateScroll()
    })

    onMounted(() => {
      updateScroll()
    })

    return {
      isDark,
      navbar,
      animatedBackground,
      routerView,
      currentRouteName,
      updateScroll,
      scrollToTop,
      showScrollTop,
      scrollProgress,
    }
  },
});