import { useColorMode } from "@vueuse/core"
import { defineStore } from "pinia"
import { ref, watch, } from "vue"

export const useThemeStore = defineStore('theme', () => {
  // Estado reactivo
  const isDark = ref<boolean>(true)
  const colorMode = useColorMode({
    attribute: 'class',
    modes: {
      light: '',
      dark: 'dark'
    }
  })
  // Inicializar el tema
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = prefersDark
    }

    updateDOM(isDark.value)
  }

  // Actualizar el DOM y localStorage
  const updateDOM = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark)
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  // Toggle theme function
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Watch para cambios en isDark
  watch(isDark, (newValue) => {
    updateDOM(newValue)
  }, { immediate: true })

  // Inicializar al crear el store
  initTheme()

  return {
    isDark,
    toggleTheme,
    colorMode
  }
})
