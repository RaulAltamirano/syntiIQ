import { defineComponent } from 'vue';
import Navbar from '../../components/Navbar/Navbar.vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../../store/ThemeStore';
import AnimatedBackground from '../../components/Backgound/AnimatedBackground.vue';

export default defineComponent({
  name: "DefaultLayout",
  components: {
    Navbar,
    AnimatedBackground
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    return {
      isDark
    }
  },
});