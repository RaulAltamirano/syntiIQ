import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
  
  export default defineComponent({
    name: "SearchProduct",
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    setup(props, { emit }) {
      const searchQuery = ref("");
      const filteredProducts = ref([]);
            const showDropdown = ref(false);
      const searchContainer = ref(null);
  
      const handleSearch = () => {
        filteredProducts.value = props.products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      };
  
      const selectProduct = (product) => {
        emit("product-selected", product);
        searchQuery.value = "";
        showDropdown.value = false; // Ocultar el menú después de seleccionar un producto
      };
  
      const handleClickOutside = (event: { target: any; }) => {
        if (searchContainer.value && !searchContainer.value.contains(event.target)) {
          showDropdown.value = false;
        }
      };
  
  

      onMounted(() => {
        document.addEventListener("click", handleClickOutside);
      });
  
      onBeforeUnmount(() => {
        document.removeEventListener("click", handleClickOutside);
      });
  
  
      return { searchQuery, filteredProducts, handleSearch, selectProduct, showDropdown, searchContainer };
    },
  });