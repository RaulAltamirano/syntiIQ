import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CardHome from '../components/CardHome.vue';
import { useMotion } from '@vueuse/motion';
import { useTheme } from '@/modules/shared/composables/useTheme';

export default defineComponent({
  name: "Home",
  components: {
    CardHome,
  },
  setup() {
    const router = useRouter();
    const { isDark } = useTheme()
    const isLoading = ref(false);
    const titleMotion = ref(null)

    const handleCardClick = (name: any) => {
      console.log('Saludos', name);
      router.push({ name: name });
    };


    const getIconClass = (baseClass: any) => {
      const iconClasses = {
        'bg-primary': 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
        'bg-success': 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
        'bg-error': 'bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
        'bg-warning': 'bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
        'bg-purple-500': 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500',
        'bg-orange-500': 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500',
        'bg-gray-500': 'bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500'
      };

      return iconClasses[baseClass] || baseClass;
    };


    onMounted(() => {
      useMotion(titleMotion, {
        initial: {
          opacity: 0,
          y: -20
        },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 600
          }
        }
      })
    })

    return {
      isDark,
      cards,
      handleCardClick,
      isLoading,
      getIconClass,
    };
  },
});