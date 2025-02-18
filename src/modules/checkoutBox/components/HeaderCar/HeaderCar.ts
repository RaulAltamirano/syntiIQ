import { useTheme } from "@/modules/shared/composables/useTheme";
import { ref, nextTick, onMounted } from "vue";

export default {
    name: ' App',
    components: {
        // ComponentName
    },
    setup() {
        const carts = ref([
            { id: Number(), name: 'Carrito 1', itemCount: 0, isEditing: false, showDropdown: false }
        ]);
        const { isDark } = useTheme()
        const currentCartIndex = ref(0);
        const isPriceCheckerActive = ref(false);
        const editInput = ref(null);

        // Genera un icono basado en el índice del carrito
        const getCartIcon = (index: number) => {
            const icons = ['shopping-cart', 'cart-shopping', 'basket-shopping', 'cart-plus', 'shopping-bag'];
            return icons[index % icons.length];
        };

        const addNewCart = () => {
            const newIndex = carts.value.length + 1;
            carts.value.push({
                id: uuidv4(),
                name: `Carrito ${newIndex}`,
                itemCount: 0,
                isEditing: false,
                showDropdown: false
            });
            saveCartsToLocalStorage();
        };

        const switchCart = (index: string | number) => {
            currentCartIndex.value = index;
            // Cierra todos los dropdowns al cambiar de carrito
            carts.value.forEach(cart => cart.showDropdown = false);
            localStorage.setItem('currentCartIndex', index);
        };

        const togglePriceChecker = () => {
            isPriceCheckerActive.value = !isPriceCheckerActive.value;
        };

        const toggleDropdown = (index: number) => {
            // Cierra todos los otros dropdowns
            carts.value.forEach((cart, i) => {
                if (i !== index) cart.showDropdown = false;
            });
            carts.value[index].showDropdown = !carts.value[index].showDropdown;
        };

        const startEditing = (index: number) => {
            carts.value[index].isEditing = true;
            carts.value.forEach((cart, i) => {
                if (i !== index) {
                    cart.isEditing = false;
                    cart.showDropdown = false;
                }
            });

            // Enfoca el input en el siguiente ciclo de renderizado
            nextTick(() => {
                if (editInput.value) {
                    editInput.value.focus();
                }
            });
        };

        const finishEditing = (index: number) => {
            const cart = carts.value[index];
            cart.isEditing = false;

            // Si el nombre está vacío, establece un nombre predeterminado
            if (!cart.name.trim()) {
                cart.name = `Carrito ${index + 1}`;
            }

            saveCartsToLocalStorage();
        };

        const duplicateCart = (index: number) => {
            const original = carts.value[index];
            const clone = {
                ...JSON.parse(JSON.stringify(original)),
                id: uuidv4(),
                name: `${original.name} (copia)`,
                isEditing: false,
                showDropdown: false
            };

            carts.value.splice(index + 1, 0, clone);
            toggleDropdown(index); // Cierra el dropdown
            saveCartsToLocalStorage();
        };

        const clearCart = (index: string | number) => {
            if (confirm('¿Estás seguro que deseas vaciar este carrito?')) {
                carts.value[index].itemCount = 0;
                // Aquí puedes emitir un evento para informar que el carrito ha sido vaciado
                toggleDropdown(index); // Cierra el dropdown
                saveCartsToLocalStorage();
            }
        };

        const removeCart = (index: number) => {
            if (carts.value.length <= 1) {
                alert('Debes mantener al menos un carrito');
                return;
            }

            if (confirm('¿Estás seguro que deseas eliminar este carrito?')) {
                carts.value.splice(index, 1);

                // Ajusta el índice actual si es necesario
                if (currentCartIndex.value >= carts.value.length) {
                    currentCartIndex.value = carts.value.length - 1;
                }

                saveCartsToLocalStorage();
            }
        };

        const shareCart = () => {
            const currentCart = carts.value[currentCartIndex.value];
            // Aquí implementarías la funcionalidad para compartir - por ejemplo generando un enlace
            alert(`Compartiendo "${currentCart.name}" - Esta funcionalidad está en desarrollo`);
        };

        const saveCarts = () => {
            saveCartsToLocalStorage();
        };

        const saveCartsToLocalStorage = () => {
            try {
                localStorage.setItem('carts', JSON.stringify(carts.value));
                localStorage.setItem('currentCartIndex', currentCartIndex.value);
            } catch (e) {
                console.error('Error al guardar carritos en localStorage:', e);
            }
        };

        const loadCartsFromLocalStorage = () => {
            try {
                const savedCarts = localStorage.getItem('carts');
                const savedIndex = localStorage.getItem('currentCartIndex');

                if (savedCarts) {
                    carts.value = JSON.parse(savedCarts);
                    // Asegúrate de que todos los carritos tienen los campos necesarios
                    carts.value.forEach(cart => {
                        if (!cart.id) cart.id = uuidv4();
                        if (cart.isEditing === undefined) cart.isEditing = false;
                        if (cart.showDropdown === undefined) cart.showDropdown = false;
                        if (cart.itemCount === undefined) cart.itemCount = 0;
                    });
                }

                if (savedIndex !== null) {
                    currentCartIndex.value = parseInt(savedIndex);
                }
            } catch (e) {
                console.error('Error al cargar carritos desde localStorage:', e);
            }
        };

        // Carga los carritos al montar el componente
        onMounted(() => {
            loadCartsFromLocalStorage();

            // Cierra los dropdowns cuando se hace clic fuera
            document.addEventListener('click', (event) => {
                const target = event.target;
                const isDropdownOrButton = target.closest('.relative');

                if (!isDropdownOrButton) {
                    carts.value.forEach(cart => {
                        cart.showDropdown = false;
                    });
                }
            });
        });

        return {
            carts,
            currentCartIndex,
            isPriceCheckerActive,
            editInput,
            getCartIcon,
            addNewCart,
            switchCart,
            togglePriceChecker,
            toggleDropdown,
            startEditing,
            finishEditing,
            duplicateCart,
            isDark,
            clearCart,
            removeCart,
            shareCart,
            saveCarts
        };
    }
}

