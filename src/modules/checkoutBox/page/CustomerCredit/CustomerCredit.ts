import { useTheme } from "@/modules/shared/composables/useTheme";
import { ref } from "vue";

export default {
	name: 'CustomerCredit',
	components: {
		// ComponentName
	},
	setup() {
		const { isDark } = useTheme()
		const activeCredits = ref([
			{
				id: 1,
				clientName: 'Juan Pérez',
				amount: 1500,
				remainingAmount: 800,
				nextPaymentDate: '2025-03-15',
				status: 'Al día',
				paymentHistory: [
					{ date: '2025-01-15', amount: 350 },
					{ date: '2025-02-15', amount: 350 }
				]
			}
		]);

		const creditLimit = ref(3000);
		const showNewCreditForm = ref(false);
		const selectedClient = ref(null);

		// Animaciones con Vue Motion
		const tableMotion = {
			initial: { opacity: 0, y: 20 },
			enter: { opacity: 1, y: 0 },
			transition: { duration: 300 }
		};

		// Métodos
		const openNewCreditForm = () => {
			showNewCreditForm.value = true;
		};

		const calculateCreditStatus = (credit: { nextPaymentDate: string | number | Date; }) => {
			const today = new Date();
			const nextPayment = new Date(credit.nextPaymentDate);
			return today > nextPayment ? 'Atrasado' : 'Al día';
		};

		const calculateProgress = (credit: { amount: any; remainingAmount: number; }) => {
			const total = credit.amount;
			const paid = total - credit.remainingAmount;
			return (paid / total) * 100;
		};
		return {
			activeCredits,
			creditLimit,
			selectedClient,
			tableMotion,
			openNewCreditForm,
			calculateCreditStatus,
			isDark,
			calculateProgress,
		};
	}
}