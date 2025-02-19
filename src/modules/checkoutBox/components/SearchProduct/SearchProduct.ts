import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from "vue";

export default defineComponent({
  name: "SearchProduct",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchQuery = ref('');
    const isFocused = ref(false);
    const showDropdown = ref(false);
    const isLoading = ref(false);
    const searchTimeout = ref();
    const searchContainer = ref(null);
    const debounceTime = ref(5000)

    // Datos de ejemplo para usar con el componente de búsqueda
const products = [
  {
    id: 1,
    name: "Smartphone Galaxy S23",
    characteristics: "8GB RAM, 256GB, Procesador Snapdragon 8 Gen 2",
    price: 1099.99,
    category: "Electrónica",
    image: "https://via.placeholder.com/150?text=GalaxyS23"
  },
  {
    id: 2,
    name: "Laptop MacBook Pro",
    characteristics: "16GB RAM, 512GB SSD, M2 Pro, 14 pulgadas",
    price: 1899.99,
    category: "Computadoras",
    image: "https://via.placeholder.com/150?text=MacBookPro"
  },
  {
    id: 3,
    name: "Auriculares Sony WH-1000XM5",
    characteristics: "Cancelación de ruido, 30 horas de batería, Bluetooth 5.2",
    price: 349.99,
    category: "Audio",
    image: "https://via.placeholder.com/150?text=SonyWH1000XM5"
  },
  {
    id: 4,
    name: "Smart TV LG OLED C2",
    characteristics: "65 pulgadas, 4K, HDR10+, WebOS",
    price: 1599.99,
    category: "Televisores",
    image: "https://via.placeholder.com/150?text=LGOLED"
  },
  {
    id: 5,
    name: "Cámara Sony Alpha A7IV",
    characteristics: "33MP, 4K60fps, Estabilización IBIS, WiFi",
    price: 2499.99,
    category: "Fotografía",
    image: "https://via.placeholder.com/150?text=SonyA7IV"
  },
  {
    id: 6,
    name: "Tablet iPad Pro",
    characteristics: "12.9 pulgadas, M2, 256GB, WiFi+Cellular",
    price: 1299.99,
    category: "Tablets",
    image: "https://via.placeholder.com/150?text=iPadPro"
  },
  {
    id: 7,
    name: "Monitor Samsung Odyssey G7",
    characteristics: "32 pulgadas, 240Hz, 1ms, Curvo, QHD",
    price: 699.99,
    category: "Monitores",
    image: "https://via.placeholder.com/150?text=OdysseyG7"
  },
  {
    id: 8,
    name: "Teclado Mecánico Logitech G915",
    characteristics: "Inalámbrico, Retroiluminado RGB, Switches GL Táctiles",
    price: 229.99,
    category: "Periféricos",
    image: "https://via.placeholder.com/150?text=LogitechG915"
  },
  {
    id: 9,
    name: "Consola PlayStation 5",
    characteristics: "825GB SSD, 4K120fps, Ray Tracing, DualSense",
    price: 499.99,
    category: "Videojuegos",
    image: "https://via.placeholder.com/150?text=PS5"
  },
  {
    id: 10,
    name: "Altavoces Sonos Beam Gen 2",
    characteristics: "Barra de sonido, Dolby Atmos, HDMI eARC, WiFi",
    price: 449.99,
    category: "Audio",
    image: "https://via.placeholder.com/150?text=SonosBeam"
  },
  {
    id: 11,
    name: "Smartwatch Apple Watch Series 8",
    characteristics: "GPS+Cellular, 45mm, Sensor de temperatura, ECG",
    price: 499.99,
    category: "Wearables",
    image: "https://via.placeholder.com/150?text=AppleWatch"
  },
  {
    id: 12,
    name: "Impresora Multifunción HP OfficeJet Pro",
    characteristics: "WiFi, Duplex, Escaneo, Copia, 22ppm",
    price: 249.99,
    category: "Oficina",
    image: "https://via.placeholder.com/150?text=HPOfficeJet"
  },
  {
    id: 13,
    name: "Router ASUS RT-AX86U",
    characteristics: "WiFi 6, 2.5Gbps, AiMesh, Gaming, Seguridad AiProtection",
    price: 249.99,
    category: "Redes",
    image: "https://via.placeholder.com/150?text=AsusRouter"
  },
  {
    id: 14,
    name: "Disco SSD Samsung 970 EVO Plus",
    characteristics: "1TB, NVMe, PCIe 3.0, 3500MB/s Lectura",
    price: 119.99,
    category: "Almacenamiento",
    image: "https://via.placeholder.com/150?text=SamsungSSD"
  },
  {
    id: 15,
    name: "Audífonos AirPods Pro 2",
    characteristics: "Cancelación activa de ruido, Resistentes al agua, Transparency Mode",
    price: 249.99,
    category: "Audio",
    image: "https://via.placeholder.com/150?text=AirPodsPro"
  }
];

    // Computed properties
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return [];

      const query = searchQuery.value.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.characteristics.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    });

    // Methods
    const handleFocus = () => {
      isFocused.value = true;
      showDropdown.value = searchQuery.value.length > 0;
    };

    const handleBlur = () => {
      isFocused.value = false;
      // Delay hiding dropdown to allow clicking items
      setTimeout(() => {
        showDropdown.value = false;
      }, 200);
    };

    const handleSearch = () => {
      // Clear previous timeout
      if (searchTimeout.value) clearTimeout(searchTimeout.value);

      // Show loading state immediately if query exists
      if (searchQuery.value.length > 0) {
        isLoading.value = true;
        showDropdown.value = true;
      } else {
        isLoading.value = false;
        showDropdown.value = false;
      }

      // Debounce the actual search
      searchTimeout.value = setTimeout(() => {
        emit('search', searchQuery.value);
        isLoading.value = false;
      }, debounceTime.value);
    };

    const selectProduct = (product: any) => {
      emit('select-product', product);
      searchQuery.value = '';
      showDropdown.value = false;
    };

    const clearSearch = () => {
      searchQuery.value = '';
      showDropdown.value = false;
      isLoading.value = false;
      nextTick(() => {
        const inputElement = searchContainer.value.querySelector('input');
        if (inputElement) inputElement.focus();
      });
    };

    const handleImageError = (event: { target: { src: string; }; }) => {
      event.target.src = '/path/to/fallback-image.jpg'; // Replace with your fallback image
    };

    const formatPrice = (price: { toLocaleString: (arg0: string, arg1: { minimumFractionDigits: number; maximumFractionDigits: number; }) => any; }) => {
      return price.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    // Close dropdown when clicking outside
    onMounted(() => {
      const handleClickOutside = (event: { target: any; }) => {
        if (searchContainer.value && !searchContainer.value.contains(event.target)) {
          showDropdown.value = false;
        }
      };
      document.addEventListener('click', handleClickOutside);

      // Cleanup
      onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
      });
    });

    // Watch for changes in search query
    watch(searchQuery, (newValue) => {
      if (!newValue) {
        showDropdown.value = false;
        isLoading.value = false;
      }
    });



    return {
      searchQuery,
      isFocused,
      showDropdown,
      isLoading,
      searchTimeout,
      searchContainer,
      filteredProducts,
      handleFocus,
      handleBlur,
      handleSearch,
      selectProduct,
      clearSearch,
      handleImageError,
      formatPrice,
      products,
    };
  },
});