import { computed, defineComponent, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { useTheme } from '../../composables/useTheme';
import { MotionVariants, useMotion } from '@vueuse/motion';
import ToggleThemeButton from '../../../auth/components/ToggleThemeButton/ToggleThemeButton.vue';

export default defineComponent({
  name: "AuthLayout",
  components: {
    FontAwesomeIcon,
    ToggleThemeButton
  },
  setup() {
    const { isDark, themeStore } = useTheme()
    const contentRef = ref(null)

    const contentMotion = useMotion(contentRef, {
      initial: { opacity: 0, y: 20 },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 500,
          type: 'spring',
          stiffness: 100
        }
      },
      leave: {
        opacity: 0,
        y: -20,
        transition: { duration: 300 }
      }
    })
    const buttonVariants: MotionVariants = {
      initial: {
        scale: 1,
        opacity: 0.8
      },
      enter: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 300
        }
      },
      hover: {
        scale: 1.05,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      },
      tap: {
        scale: 0.95
      }
    }

    const layoutClasses = computed(() => ({
      'flex min-h-screen items-center justify-center p-4': true,
      'bg-gray-50 dark:bg-gray-900': true,
      'transition-colors duration-300': true
    }))

    const { isAnimating } = useMotion(contentRef, {
      initial: { opacity: 0, y: 50 },
      enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 600, ease: 'easeOut' }
      }
    })


    const handleBeforeEnter = () => {
      contentMotion.apply('enter')
    }

    const handleBeforeLeave = () => {
      contentMotion.apply('leave')
    }
    return {
      isDark,
      toggleTheme: themeStore.toggleTheme,
      contentRef,
      contentMotion,
      layoutClasses,
      buttonVariants,
      handleBeforeEnter,
      handleBeforeLeave,
      isAnimating
    }

  },
});