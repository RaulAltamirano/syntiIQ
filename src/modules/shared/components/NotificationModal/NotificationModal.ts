import { computed, onUnmounted, ref, watch } from "vue";

export default {
	name: 'NotificationModal',
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: 'info',
			validator: (value: string) => ['success', 'error', 'warning', 'info'].includes(value)
		},
		duration: {
			type: Number,
			default: 5000
		},
		position: {
			type: String,
			default: 'top-center',
			validator: (value: string) => [
				'top-right',
				'top-left',
				'bottom-right',
				'bottom-left',
				'top-center',
				'bottom-center'
			].includes(value)
		}
	

	},
	components: {
	},
	emits: ['close'],
	setup(props, { emit }) {
    const notificationRef = ref(null)
    const timer = ref(0)

    const getTypeStyles = computed(() => {
      const styles = {
        success: 'bg-green-100 dark:bg-green-800 border-green-500',
        error: 'bg-red-100 dark:bg-red-800 border-red-500',
        warning: 'bg-yellow-100 dark:bg-yellow-800 border-yellow-500',
        info: 'bg-blue-100 dark:bg-blue-800 border-blue-500'
      }
      return styles[props.type] || styles.info
    })

    const getIconColor = computed(() => {
      const colors = {
        success: 'text-green-500 dark:text-green-300',
        error: 'text-red-500 dark:text-red-300',
        warning: 'text-yellow-500 dark:text-yellow-300',
        info: 'text-blue-500 dark:text-blue-300'
      }
      return colors[props.type] || colors.info
    })

    const getInitialPosition = () => {
      switch (props.position) {
        case 'top-right':
          return { top: '1rem', right: '1rem' }
        case 'top-left':
          return { top: '1rem', left: '1rem' }
        case 'bottom-right':
          return { bottom: '1rem', right: '1rem' }
        case 'bottom-left':
          return { bottom: '1rem', left: '1rem' }
        case 'top-center':
          return { top: '1rem', left: '50%', transform: 'translateX(-50%)' }
        case 'bottom-center':
          return { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }
        default:
          return { top: '1rem', right: '1rem' }
      }
    }

    const handleClose = () => {
      emit('close')
    }

    watch(() => props.isOpen, (newValue) => {
      if (newValue && props.duration) {
        if (timer.value) clearTimeout(timer.value)
        timer.value = setTimeout(() => {
          handleClose()
        }, props.duration)
      }
    })

    onUnmounted(() => {
      if (timer.value) {
        clearTimeout(timer.value)
      }
    })

    return {
      notificationRef,
      getTypeStyles,
      getIconColor,
      getInitialPosition,
      handleClose
    }
  }
};


