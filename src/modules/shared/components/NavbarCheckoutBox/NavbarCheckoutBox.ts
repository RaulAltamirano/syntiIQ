import { computed, ref } from "vue";
import { useTheme } from "../../composables/useTheme";
import { useRouter } from "vue-router";
import CashClosingModal from "@/modules/checkoutBox/components/CashClosingModal/CashClosingModal.vue";

export default {
    name: 'NavbarCheckoutBox',
    components: {
        CashClosingModal
    },
    setup() {
        const { isDark, themeStore } = useTheme()
        const currentView = ref('cashier-sales')
        const isModalOpen = ref(true);

        const isHovered = ref(false);
        const isMenuOpen = ref(false);
        const showNotifications = ref(false);


        const router = useRouter()
        const menuItems = [
            { id: 'cashier-sales', label: 'Sales', icon: 'cash-register', notifications: 1 },
            { id: 'cashier-returns', label: 'Returns', icon: 'undo' },
            { id: 'cashier-register', label: 'Cash Register', icon: 'money-bill' },
            { id: 'cashier-credits', label: 'Customer Credits', icon: 'credit-card' },
            { id: 'cashier-history', label: 'Sales History', icon: 'history' },
            { id: 'cashier-inventory', label: 'Inventory', icon: 'boxes' },
            { id: 'cashier-reports', label: 'Reports', icon: 'file' },

        ]

        const goTo = (value: any) => {
            currentView.value = value
            router.push({ name: value })
        }
        // Notificaciones
        const notifications = ref([
            {
                title: 'Nueva venta',
                message: 'Se ha registrado una nueva venta de $1,500',
                time: 'Hace 5 minutos',
                read: false,
                type: 'sale'
            },
            {
                title: 'Stock bajo',
                message: 'El producto "Termo XYZ" está por debajo del stock mínimo',
                time: 'Hace 1 hora',
                read: false,
                type: 'inventory'
            },
            {
                title: 'Actualización del sistema',
                message: 'Se ha instalado la versión 2.1 correctamente',
                time: 'Hace 2 horas',
                read: true,
                type: 'system'
            },
            {
                title: 'Nuevo cliente',
                message: 'Carlos Pérez se ha registrado en el sistema',
                time: 'Ayer',
                read: false,
                type: 'customer'
            }
        ]);
        const markAsRead = (index) => {
            notifications.value[index].read = true;
        };

        const markAllAsRead = () => {
            notifications.value.forEach(notification => {
                notification.read = true;
            });
        };

        // Obtener clase de color según tipo de notificación
        const getNotificationTypeClass = (type) => {
            switch (type) {
                case 'sale': return 'bg-green-500';
                case 'inventory': return 'bg-orange-500';
                case 'system': return 'bg-blue-500';
                case 'customer': return 'bg-purple-500';
                default: return 'bg-gray-500';
            }
        };

        // Obtener icono según tipo de notificación
        const getNotificationIcon = (type) => {
            switch (type) {
                case 'sale': return ['fas', 'dollar-sign'];
                case 'inventory': return ['fas', 'exclamation-triangle'];
                case 'system': return ['fas', 'sync'];
                case 'customer': return ['fas', 'user-plus'];
                default: return ['fas', 'bell'];
            }
        };

        // Calcular total de notificaciones no leídas
        const totalNotifications = computed(() => {
            return notifications.value.filter(n => !n.read).length;
        });

        const toggleNotifications = () => {
            showNotifications.value = !showNotifications.value;
            // Cerrar menú móvil si está abierto al abrir notificaciones
            if (showNotifications.value && isMenuOpen.value) {
              isMenuOpen.value = false;
            }
          };
          

        return {
            menuItems,
            currentView,
            isDark,
            isModalOpen,
            goTo,
            isHovered,
            isMenuOpen,
            notifications,
            markAsRead,
            markAllAsRead,
            toggleNotifications,
            getNotificationTypeClass,
            getNotificationIcon,
            totalNotifications,
            showNotifications,
            toggleTheme: themeStore.toggleTheme
        };
    }
}