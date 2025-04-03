import { ref } from "vue";
import NavbarCheckoutBox from "../../components/NavbarCheckoutBox/NavbarCheckoutBox.vue";
import { useTheme } from "../../composables/useTheme";

export default {
    name: 'CheckoutBoxLayout',
    components: {
        NavbarCheckoutBox,
    },
    setup() {
        const { isDark } = useTheme()
        const openModal = ref(true)
        return {
            isDark,
            openModal
        };
    }
}