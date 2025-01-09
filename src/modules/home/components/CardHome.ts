import { ref } from "vue";
import { useThemeStore } from "../../shared/store/ThemeStore";
import { storeToRefs } from "pinia";

export default {
	name: 'CardHome',
	components: {
	},
	props: {
		icon: String,
		iconBg: String,
		title: String,
		description: String,
	},
	setup() {
		const themeStore = useThemeStore()
		const { isDark } = storeToRefs(themeStore)

		const darkCardStyle = 'backdrop-blur-lg bg-gray-900/30 border border-gray-700/30 rounded-xl'
		const lightCardStyle = 'bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl hover:shadow-2xl'
		const isHovered = ref(false)
		return {
			isHovered,
			darkCardStyle,
			lightCardStyle,
			isDark
		}
	},
};
