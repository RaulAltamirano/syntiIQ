import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '../../composables/useTheme';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMotion } from '@vueuse/motion';

export default defineComponent({
  name: "TitleCard",
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }, 
    actions: { type: Array, default: () => [] }, 
  },
  components: {
    useMotion,
    FontAwesomeIcon,
  },
  setup() {
    const { isDark } = useTheme()
    const router = useRouter()
    const motionElement = ref(null); 

    useMotion(motionElement, {
      initial: { y: -20, opacity: 0 },
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

    return {
      isDark,
      router,
      motionElement,
    }
  },
});