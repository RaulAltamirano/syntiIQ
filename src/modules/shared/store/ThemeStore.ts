import { useColorMode } from "@vueuse/core"
import { defineStore } from "pinia"
import { computed, ref, watch, } from "vue"

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(true)
  
  const colorMode = useColorMode({
    attribute: 'class',
    modes: {
      light: 'light',
      dark: 'dark',
    },
  })
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
  }
  const updateDOM = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    colorMode.value = dark ? 'dark' : 'light'
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (newValue) => {
    updateDOM(newValue)
  }, { immediate: true })

  initTheme()
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

  return {
    isDark,
    toggleTheme,
    currentTheme,
    colorMode,
  }
})