import { defineComponent } from 'vue';
import { useThemeStore } from '../../store/ThemeStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "TitleCard",
  props: {
    name: String
  },
  components: {
    // 
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    const router = useRouter()
    return {
      isDark,
      router
    }
  },
});