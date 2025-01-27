import { storeToRefs } from "pinia";
import { useThemeStore } from "../../store/ThemeStore";


export default {
  name: 'LoadingView',
  components: {
    
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)


    return {
        isDark
    }
  }
};


