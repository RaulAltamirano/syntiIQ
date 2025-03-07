import { ref, computed, watch } from "vue"

import { useTheme } from "@/modules/shared/composables/useTheme"
import SearchProduct from "../../components/SearchProduct/SearchProduct.vue"
import HeaderCar from "../../components/HeaderCar/HeaderCar.vue"
import StatsCheckoutBox from "../../components/StatsCheckoutBox/StatsCheckoutBox.vue"

export default {
	name: 'SalesView',
	components: {
		SearchProduct,
		StatsCheckoutBox,
		HeaderCar
	},
	setup() {


		// Estado
		const { isDark } = useTheme()
		const currentView = ref('sales')
		const showPriceChecker = ref(false)
		const selectedProduct = ref(null)
		const carts = ref([{ items: [], discount: 0 }])
		const currentCartIndex = ref(0)
		const taxRate = ref(16)

		// Computed
		const currentCart = computed(() => carts.value[currentCartIndex.value])
		const currentCartTotal = computed(() => {
			const items = currentCart.value.items
			const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
			const tax = subtotal * (taxRate.value / 100)
			const discount = currentCart.value.discount || 0
			return {
				subtotal,
				tax,
				total: subtotal + tax - discount
			}
		})

		// Métodos
		const toggleDarkMode = () => {
			// themeStore.toggleTheme()
		}

		const togglePriceChecker = () => {
			showPriceChecker.value = !showPriceChecker.value
		}

		const showProductPrice = (product) => {
			selectedProduct.value = product
		}

		const addNewCart = () => {
			carts.value.push({ items: [], discount: 0 })
			currentCartIndex.value = carts.value.length - 1
		}

		const switchCart = (index) => {
			currentCartIndex.value = index
		}

		const handleProductSelected = (product) => {
			const existingItem = currentCart.value.items.find(item => item.id === product.id)
			if (existingItem) {
				existingItem.quantity++
			} else {
				currentCart.value.items.push({
					...product,
					quantity: 1
				})
			}
		}

		const increaseQuantity = (item) => {
			item.quantity++
		}

		const decreaseQuantity = (item) => {
			if (item.quantity > 1) {
				item.quantity--
			} else {
				removeItem(item)
			}
		}

		const removeItem = (item) => {
			const index = currentCart.value.items.findIndex(i => i.id === item.id)
			if (index > -1) {
				currentCart.value.items.splice(index, 1)
			}
		}

		const applyDiscount = (item) => {
			// Implementar lógica de descuento
		}

		const holdCart = () => {
			// Implementar lógica para pausar venta
		}

		const showPaymentOptions = () => {
			// Implementar modal de opciones de pago
		}

		const addProductByBarcode = () => {
			// Implementar modal de opciones de pago
		}

		// Observadores
		watch(carts, (newCarts) => {
			// Persistir carritos en el store
			cartStore.updateCarts(newCarts)
		}, { deep: true })

		const products = ref([
			{ id: 1, name: 'Producto 1', price: 19.99, stock: 100, sku: 'SKU001', description: 'Descripción del producto 1' },
			{ id: 2, name: 'Producto 2', price: 29.99, stock: 150, sku: 'SKU002', description: 'Descripción del producto 2' },
			// ... más productos
		])

		return {
			products,
			isDark,
			currentView,
			addProductByBarcode,
			showPriceChecker,
			selectedProduct,
			carts,
			currentCartIndex,
			taxRate,
			currentCart,
			currentCartTotal,
			toggleDarkMode,
			togglePriceChecker,
			showProductPrice,
			addNewCart,
			switchCart,
			handleProductSelected,
			increaseQuantity,
			decreaseQuantity,
			removeItem,
			applyDiscount,
			holdCart,
			showPaymentOptions,
		};
	}
}