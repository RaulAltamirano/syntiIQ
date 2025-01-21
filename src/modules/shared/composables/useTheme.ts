import { storeToRefs } from "pinia";
import { useThemeStore } from "../store/ThemeStore";

export const useTheme = () => {
  const themeStore = useThemeStore();
  const { isDark } = storeToRefs(themeStore);

  return {
    isDark,
    themeStore,
  };
};
