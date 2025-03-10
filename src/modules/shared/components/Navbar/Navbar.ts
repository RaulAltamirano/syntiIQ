import { computed, onMounted, onUnmounted, ref } from 'vue';
import logo from '../../../../assets/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../../store/ThemeStore';
import { storeToRefs } from 'pinia';
import { useAuth } from '../../../auth/composables/useAuth';


export default {
  name: 'Navbar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    const { logout } = useAuth()
    const router = useRouter()
    const wishlistCount = ref(1)
    const cartCount = ref(1)
    const userName = ref("Juan")
    const showDropdown = ref(false)
    const cartAnimation = ref(false);
    const wishlistAnimation = ref(false);
    const isScrolled = ref()
    const userAvatar = ref('https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a752b0fec11d8c4c9beaf7_Olivia%20Rhye-p-500.jpg')
    const hasNewNotifications = ref(false)
    const notificationCount = ref(1)

    // Methods
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const closeDropdown = () => {
      showDropdown.value = false
    }

    const navigateTo = (route: string) => {
      router.push({ name: route })
      closeDropdown()
    }

    const onLogout = async () => {
      logout()
      // router.push({ name: 'Login' })
      closeDropdown()
    }

    // Scroll handler
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20
    }

    // Lifecycle
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    // Menu items configuration
    const menuItems = computed(() => [
      {
        label: 'Mi Perfil',
        icon: 'user',
        action: () => navigateTo('Profile')
      },
      {
        label: 'Cerrar Sesión',
        icon: 'sign-out-alt',
        action: onLogout,
        danger: true
      }
    ])
    const navClasses = computed(() => {
      return {
        'bg-white/90 shadow-black/5': !isDark.value && isScrolled.value,
        'bg-white/60': !isDark.value && !isScrolled.value,
        'bg-gray-900/90 shadow-gray-900/20': isDark.value && isScrolled.value,
        'bg-gray-900/60': isDark.value && !isScrolled.value,
      };
    });

    const changeTheme = () => {
      themeStore.toggleTheme()
    }

    return {
      logo,
      wishlistCount,
      cartCount,
      changeTheme,
      toggleDropdown,
      hasNewNotifications,
      userName,
      closeDropdown,
      notificationCount,
      onLogout,
      showDropdown,
      navClasses,
      cartAnimation,
      wishlistAnimation,
      menuItems,
      navigateTo,
      isScrolled,
      userAvatar,
      isDark,
    }
  },
};
