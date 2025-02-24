import { useTheme } from "@/modules/shared/composables/useTheme";
import { ref, computed } from "vue";
import StatCardCloseCheckout from "../StatCardCloseCheckout/StatCardCloseCheckout.vue";

export default {
    name: 'CashClosingModal',
    components: {
        StatCardCloseCheckout
    },
    setup() {
        const { isDark } = useTheme()
        const totalCash = ref(1500);
        const isModalOpen = ref(true);
        const totalCard = ref(800);
        const totalOther = ref(300);
        const totalTransactions = ref(25);
        const initialBalance = ref(500);
        const finalBalance = ref(3100);
        const adjustmentNotes = ref('');
        const movements = ref([
            { id: 1, type: 'income', amount: 200, description: 'Depósito en efectivo' },
            { id: 2, type: 'expense', amount: 100, description: 'Retiro para cambio' },
        ]);
        const topProducts = ref([
            { id: 1, name: 'Producto A', quantity: 10 },
            { id: 2, name: 'Producto B', quantity: 8 },
        ]);

        // Cálculos
        const difference = computed(() => finalBalance.value - initialBalance.value - totalCash.value - totalCard.value - totalOther.value);

        // Funciones
        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const confirmClose = () => {
            // Lógica para confirmar el cierre de caja
            console.log('Cierre de caja confirmado');
            closeModal();
        };
        const formatCurrency = (value) => `$${value.toFixed(2)}`

        return {
            isModalOpen,
            totalCash,
            totalCard,
            totalOther,
            totalTransactions,
            initialBalance,
            isDark,
            finalBalance,
            formatCurrency,
            adjustmentNotes,
            movements,
            topProducts,
            difference,
            openModal,
            closeModal,
            confirmClose,
        };
    }
}