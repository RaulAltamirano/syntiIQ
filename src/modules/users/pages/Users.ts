import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
    name: "Users",
    setup() {

        const isDark = ref(false)
        const searchQuery = ref('')
        const roleFilter = ref('')
        const statusFilter = ref('')
        const currentPage = ref(1)
        const itemsPerPage = 10


        const users = ref([
            {
              id: 1,
              name: 'Ana García',
              email: 'ana.garcia@example.com',
              role: 'admin',
              status: 'active',
              lastAccess: '2024-03-20T10:30:00'
            },
            // ... más usuarios
          ])
          
          // Computed Properties
          const filteredUsers = computed(() => {
            let filtered = users.value
          
            if (searchQuery.value) {
              filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
              )
            }
          
            if (roleFilter.value) {
              filtered = filtered.filter(user => user.role === roleFilter.value)
            }
          
            if (statusFilter.value) {
              filtered = filtered.filter(user => user.status === statusFilter.value)
            }
          
            return filtered
          })
          
          const totalUsers = computed(() => filteredUsers.value.length)
          const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage))
          const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
          const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalUsers.value))
          
          // Métodos
          const toggleTheme = () => {
            isDark.value = !isDark.value
          }
          
          const getInitials = (name: string) => {
            return name
              .split(' ')
              .map((word: any[]) => word[0])
              .join('')
              .toUpperCase()
          }
          
          const getRoleClasses = (role: string | number) => {
            const classes = {
              admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
              user: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
              editor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }
            return classes[role] || ''
          }
          
          const getStatusClasses = (status: string | number) => {
            const classes = {
              active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
              inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }
            return classes[status] || ''
          }
          
          const formatDate = (date: string | number | Date) => {
            return new Date(date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
          
          const previousPage = () => {
            if (currentPage.value > 1) {
              currentPage.value--
            }
          }
          
          const nextPage = () => {
            if (currentPage.value < totalPages.value) {
              currentPage.value++
            }
          }
          
          // Métodos para acciones de usuario
          const openNewUserModal = () => {
            // Implementar lógica para abrir modal de nuevo usuario
          }
          
          const editUser = (user: any) => {
            // Implementar lógica para editar usuario
          }
          
          const deleteUser = (user: any) => {
            // Implementar lógica para eliminar usuario
          }
          
          const openUserTools = (user: any) => {
            // Implementar lógica para abrir herramientas avanzadas
          }
          
        return {
            isDark,
            searchQuery,
            roleFilter,
            statusFilter,
            currentPage,
            itemsPerPage,
            users,
            filteredUsers,
            totalUsers,
            totalPages,
            startIndex,
            endIndex,
            toggleTheme,
            getInitials,
            getRoleClasses,
            getStatusClasses,
            formatDate,
            previousPage,
            nextPage,
            openNewUserModal,
            editUser,
            deleteUser,
            openUserTools,
        }
    }
})  
