import { defineComponent, ref } from "vue";
import SearchProduct from "../SearchProduct/SearchProduct.vue";

export default defineComponent({
    name: "CheckoutBox",
    components: {
        SearchProduct
    },
    setup() {
        let cartItems = [
            {
                id: 1,
                name: "Producto A",
                description: "Descripción breve del producto A",
                price: 29.99,
                image: "https://via.placeholder.com/64",
            },
            {
                id: 2,
                name: "Producto B",
                description: "Descripción breve del producto B",
                price: 45.99,
                image: "https://via.placeholder.com/64",
            },
            {
                id: 3,
                name: "Producto B",
                description: "Descripción breve del producto B",
                price: 45.99,
                image: "https://via.placeholder.com/64",
            },
            {
                id: 4,
                name: "Producto B",
                description: "Descripción breve del producto B",
                price: 45.99,
                image: "https://via.placeholder.com/64",
            },
        ]
        const products = ref([
            {
              id: 1,
              name: "Producto A",
              characteristics: "Color rojo, tamaño grande",
              price: 25.99,
              image: "https://via.placeholder.com/150",
            },
            {
              id: 2,
              name: "Producto B",
              characteristics: "Color azul, tamaño pequeño",
              price: 19.99,
              image: "https://via.placeholder.com/150",
            },
            {
              id: 3,
              name: "Producto A",
              characteristics: "Color verde, tamaño mediano",
              price: 29.99,
              image: "https://via.placeholder.com/150",
            },
          ]);
      
        const discount = ref()
        const barcodeInput = ref()
        const productQuery = ref()
        const pendingTickets = ref([]);
        const isVisible = ref(true)

        const handleRemoveItem = (itemId: number) => {
            cartItems = cartItems.filter((item) => item.id !== itemId);
        }
        const handleCheckout = () => {
            alert("Procediendo al pago");
        }

        const total = () => {
            return cartItems.reduce((sum, item) => sum + item.price, 0);
        }

        const removeItem = (id?: number) => {
            console.log('removeItem');
        }
        const searchProduct = () => {
            console.log('searchProduct');
        }
        const viewInventory = () => {
            console.log('viewInventory');
        }
        const viewCredits = () => {
            console.log('viewCredits');
        }
        const proceedToCheckout = () => {
            console.log('proceedToCheckout');
        }
        const applyDiscount = () => {
            console.log('apply');
        }

        const addProductByBarcode =()=>{
            console.log('addProductByBarcode');
        }
        const handleProductSelected=()=>{
            console.log('handleProductSelected');
        }


        const handleReturn = ()=>{
            console.log('handleReturn');
        }
        const handleEntry = ()=>{
            console.log('handleEntry');
        }
        const handleExit = ()=>{
            console.log('handleExit');
        }
        const viewHistory = ()=>{
            console.log('viewHistory');
        }
        const closeCashRegister = ()=>{
            console.log('closeCashRegister');
        }
        const tools = ref([
            {
              id: 'returns',
              label: 'Devoluciones',
              icon: 'undo-alt',
              bgColor: 'bg-red-500',
              hoverColor: 'hover:bg-red-600',
              gradientColors: ['#f87171', '#ef4444'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            },
            {
              id: 'entries',
              label: 'Entradas',
              icon: 'arrow-circle-down',
              bgColor: 'bg-green-600',
              hoverColor: 'hover:bg-green-700',
              gradientColors: ['#34d399', '#059669'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            },
            {
              id: 'exits',
              label: 'Salidas',
              icon: 'arrow-circle-up',
              bgColor: 'bg-yellow-500',
              hoverColor: 'hover:bg-yellow-600',
              gradientColors: ['#fbbf24', '#d97706'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            },
            {
              id: 'history',
              icon: 'history',
              label: 'Historial',
              bgColor: 'bg-gray-700',
              hoverColor: 'hover:bg-gray-800',
              gradientColors: ['#4b5563', '#1f2937'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            },
            {
              id: 'cash',
              label: 'Cierre de Caja',
              icon: 'cash-register',
              bgColor: 'bg-purple-600',
              hoverColor: 'hover:bg-purple-700',
              gradientColors: ['#8b5cf6', '#6d28d9'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            },
            {
              id: 'credits',
              label: 'Créditos',
              icon: 'credit-card',
              bgColor: 'bg-blue-600',
              hoverColor: 'hover:bg-blue-700',
              gradientColors: ['#3b82f6', '#2563eb'],
              showRipple: false,
              rippleX: 0,
              rippleY: 0
            }
          ])
          
          
          // Stagger Animation Functions
          const beforeEnter = (el) => {
            el.style.opacity = 0
            el.style.transform = 'translateY(100px)'
          }
          
          const enter = (el, done) => {
            const delay = el.dataset.index * 100
            setTimeout(() => {
              el.style.transition = 'all 0.3s ease-out'
              el.style.opacity = 1
              el.style.transform = 'translateY(0)'
              done()
            }, delay)
          }
          
          const leave = (el, done) => {
            const delay = el.dataset.index * 100
            setTimeout(() => {
              el.style.transition = 'all 0.3s ease-in'
              el.style.opacity = 0
              el.style.transform = 'translateY(-100px)'
              done()
            }, delay)
          }
          
          // Handle Tool Click with Ripple Effect
          const handleToolClick = (tool) => {
            // Add ripple effect
            tool.showRipple = true
            tool.rippleX = event.offsetX
            tool.rippleY = event.offsetY
          
            // Handle tool-specific logic
            switch (tool.id) {
              case 'returns':
                console.log('Handling returns...')
                break
              case 'entries':
                console.log('Handling entries...')
                break
              // Add other cases as needed
            }
          }

        const saveTicket = () => {
            if (cartItems.value.length > 0) {
              pendingTickets.value.push({ id: Date.now(), items: [...cartItems.value] });
              cartItems.value = []; // Vaciar el carrito después de guardar
            }
          };
      
          const loadTicket = (ticket) => {
            cartItems.value = [...ticket.items];
            pendingTickets.value = pendingTickets.value.filter((t) => t.id !== ticket.id);
          };
      

        return {
            total,
            cartItems,
            handleRemoveItem,
            handleCheckout,
            discount,
            addProductByBarcode,
            removeItem,
            productQuery,
            searchProduct,
            tools,
            beforeEnter,        
            enter,
            leave,
            handleToolClick,
            handleProductSelected,
            barcodeInput,
            handleReturn,
            handleEntry,
            handleExit,
            viewHistory,
            closeCashRegister,
            isVisible,
            viewInventory,
            saveTicket,
            loadTicket,
            viewCredits,
            proceedToCheckout,
            pendingTickets,
            applyDiscount,
            products
        }
    }
});