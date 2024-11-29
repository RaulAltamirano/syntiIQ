import { computed, onMounted, onUnmounted, ref } from 'vue';
import logo from '../../../../assets/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../../composables/useTheme';
import { storeToRefs } from 'pinia';


export default {
  name: 'Navbar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
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
      console.log(showDropdown.value);
      showDropdown.value = !showDropdown.value
    }

    const closeDropdown = () => {
      showDropdown.value = false
    }

    const navigateTo = (route: string) => {
      router.push({ name: route })
      closeDropdown()
    }

    const onLogout = () => {
      router.push({ name: 'Login' })

      // Implement logout logic
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
    const changeTheme = () => {
      themeStore.toggleTheme()
      console.log({ isDark });
    }

    const fontTheme = computed(() => isDark ? 'moon' : 'sun')
    const toggleThemeStyle = computed(() => isDark ? 'bg-primary' : 'bg-gray-200')
    return {
      logo,
      wishlistCount,
      cartCount,
      changeTheme,
      toggleThemeStyle,
      toggleDropdown,
      hasNewNotifications,
      userName,
      closeDropdown,
      fontTheme,
      notificationCount,
      onLogout,
      showDropdown,
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
