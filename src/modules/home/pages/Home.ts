import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const isLoading = ref(false);
    const cards  = [
      {
        title: 'Caja',
        description: 'Administra tus ventas y flujo de caja de manera eficiente.',
        icon: 'cash-register',
        iconBg: 'bg-blue-500',
        route: 'CheckoutBox'
      },
      {
        title: 'Usuarios',
        description: 'Gestiona usuarios, roles y accesos a la plataforma.',
        icon: 'users',
        iconBg: 'bg-green-500',
        route: 'Users'
      },
      {
        title: 'Productos',
        description: 'Organiza y controla tu catálogo de productos.',
        icon: 'box-open',
        iconBg: 'bg-red-500',
        route: 'Products'
      },
      {
        title: 'Inventarios',
        description: 'Revisa y actualiza el stock de tus inventarios.',
        icon: 'warehouse',
        iconBg: 'bg-yellow-500',
        route: '/inventarios'
      },
      {
        title: 'Análisis',
        description: 'Visualiza estadísticas y reportes de pedidos.',
        icon: 'chart-bar',
        iconBg: 'bg-purple-500',
        route: '/analisis'
      },
      {
        title: 'Pedidos',
        description: 'Visualiza estadísticas y reportes de pedidos.',
        icon: 'box',
        iconBg: 'bg-orange-500',
        route: '/pedidos'
      },
      {
        title: 'Reportes',
        description: 'Visualiza estadísticas y reportes de pedidos.',
        icon: 'file',
        iconBg: 'bg-pink-500',
        route: '/pedidos'
      },
      {
        title: 'Configuraciones',
        description: 'Ajusta opciones avanzadas y personaliza tu sistema.',
        icon: 'cogs',
        iconBg: 'bg-gray-500',
        route: '/configuraciones'
      }
    ];
    
    const handleCardClick = (name: any) => {
      router.push({name: name.route});
    };
    const toggleTheme = () => {``
      isDark.value = !isDark.value;
    };

    const getIconClass = (baseClass: any) => {
      const iconClasses = {
        'bg-primary': 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
        'bg-success': 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
        'bg-error': 'bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
        'bg-warning': 'bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
        'bg-purple-500': 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500',
        'bg-orange-500': 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500',
        'bg-gray-500': 'bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500'
      };
      
      return iconClasses[baseClass] || baseClass;
    };
    
    
    

    return { 
      isDark,
      cards,
      handleCardClick,
      isLoading,
      toggleTheme,
      getIconClass,
     };
  },
});