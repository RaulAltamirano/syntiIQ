import { ref} from "vue";
import { useNotification } from "../../composables/useNotification";
import { NotificationPosition } from "../../interfaces/notification.interfaces";
import { useThemeStore } from "../../store/ThemeStore";
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: 'NotificationModal',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const notificationRef = ref(null)
    const { notifications, remove } = useNotification();
    const themeStore = useThemeStore()
		const { isDark } = storeToRefs(themeStore)

    // Estilo dinámico según el tipo
    const getPositionStyles = (position: NotificationPosition) => {
      return `notification-item ${positionMap[position]}`;
    };
    
    const positionMap: Record<NotificationPosition, string> = {
      'top-right': 'notification-top-right',
      'top-left': 'notification-top-left',
      'bottom-right': 'notification-bottom-right',
      'bottom-left': 'notification-bottom-left',
      'top-center': 'notification-top-center',
      'bottom-center': 'notification-bottom-center'
    };
    
    const getTypeStyles = (type: string) => ({
      'bg-green-100 border-l-green-600 dark:bg-green-950 dark:border-l-green-400': type === 'success',
      'bg-red-100 border-l-red-600 dark:bg-red-950 dark:border-l-red-400': type === 'error', 
      'bg-amber-100 border-l-amber-600 dark:bg-amber-950 dark:border-l-amber-400': type === 'warning',
      'bg-blue-100 border-l-blue-600 dark:bg-blue-950 dark:border-l-blue-400': type === 'info'
    });
  
    const getIconColor = (type: string) => ({
      'text-green-700 dark:text-green-400': type === 'success',
      'text-red-700 dark:text-red-400': type === 'error',
      'text-amber-700 dark:text-amber-400': type === 'warning', 
      'text-blue-700 dark:text-blue-400': type === 'info'
    });
  
    
    
    const getIcon = (type: string) => ({
      success: 'check',
      error: 'xmark',
      warning: 'triangle-exclamation',
      info: 'circle-info'
    }[type]);
    
    


    return {
      notificationRef,
      getTypeStyles,
      notifications,
      getIconColor,
      getPositionStyles,
      isDark,
      getIcon,
      remove,
    }
  }
};


