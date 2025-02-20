import { useTheme } from "@/modules/shared/composables/useTheme";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

export default {
  name: 'StatsCheckoutBox',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const { isDark } = useTheme()
    const showStats = ref(true)
    const stats = ref([
      { id: 1, label: 'Ventas del día', value: '$1,234.56', icon: 'fas fa-users', color: '#3B82F6' },
      { id: 2, label: 'Transacciones', value: '45', icon: 'fas fa-users', color: '#3B82F6' },
      { id: 3, label: 'Devoluciones', value: '3', icon: 'fas fa-users', color: '#3B82F6' },
      { id: 4, label: 'Promedio de venta', value: '$89.67', icon: 'fas fa-users', color: '#3B82F6' }
    ])
    

    return {
      isDark,
      stats,
      showStats,
      toggleStats() {
        showStats.value = !showStats.value;
      },
  
    };
  }
}