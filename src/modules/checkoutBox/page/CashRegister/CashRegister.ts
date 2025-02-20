import { useTheme } from "@/modules/shared/composables/useTheme"
import { ref, computed, onMounted } from "vue"

export default {
	name: 'CashRegister',
	components: {
		// ComponentName
	},
	setup() {
		const { isDark } = useTheme()
		const transactions = ref([])
		const currentBalance = ref(0)
		const showTransactionModal = ref(false)
		const transactionType = ref('')
		const amount = ref('')
		const description = ref('')
		const filterDate = ref(new Date().toISOString().split('T')[0])
		const sampleTransactions = [
			{
				id: 1,
				type: 'entrada',
				amount: 1000.00,
				description: 'Fondo inicial de caja',
				timestamp: new Date().toISOString(),
				balance: 1000.00
			},
			{
				id: 2,
				type: 'salida',
				amount: 150.50,
				description: 'Pago a proveedor',
				timestamp: new Date().toISOString(),
				balance: 849.50
			},
			{
				id: 3,
				type: 'entrada',
				amount: 500.00,
				description: 'Depósito de ventas',
				timestamp: new Date().toISOString(),
				balance: 1349.50
			},
			{
				id: 4,
				type: 'salida',
				amount: 75.25,
				description: 'Compra de suministros',
				timestamp: new Date().toISOString(),
				balance: 1274.25
			}
		]
		

		// Métodos
		const openTransactionModal = (type: string) => {
			transactionType.value = type
			showTransactionModal.value = true
		}

		const closeTransactionModal = () => {
			showTransactionModal.value = false
			resetForm()
		}

		const handleAddTransaction = () => {
			if (!amount.value || !description.value) return

			const newTransaction = {
				id: Date.now(),
				type: transactionType.value,
				amount: parseFloat(amount.value),
				description: description.value,
				timestamp: new Date().toISOString(),
				balance: transactionType.value === 'entrada'
					? currentBalance.value + parseFloat(amount.value)
					: currentBalance.value - parseFloat(amount.value)
			}

			transactions.value = [newTransaction, ...transactions.value]
			currentBalance.value = newTransaction.balance
			closeTransactionModal()
		}

		const resetForm = () => {
			amount.value = ''
			description.value = ''
			transactionType.value = ''
		}

		const formatTime = (timestamp: string | number | Date) => {
			return new Date(timestamp).toLocaleTimeString()
		}

		// Computed
		const filteredTransactions = computed(() =>
			transactions.value.filter(transaction =>
				transaction.timestamp.startsWith(filterDate.value)
			)
		)
		onMounted(() => {
			transactions.value = sampleTransactions
			currentBalance.value = transactions.value[transactions.value.length - 1].balance
		})
		
		
		return {
			transactions,
			currentBalance,
			showTransactionModal,
			transactionType,
			amount,
			description,
			filterDate,
			sampleTransactions,
			isDark,
			openTransactionModal,
			closeTransactionModal,
			handleAddTransaction,
			resetForm,
			formatTime,
			filteredTransactions,
		};
	}
}