<script lang="ts" src="./Users.ts" />

<template>
    <div :class="{ 'dark': isDark }" class="min-h-screen transition-all duration-500 p-16">
        <div class="min-h-screen">
            <!-- Fondo Dinámico -->
            <div class="absolute inset-0 transition-all duration-700">
                <!-- Fondo Modo Claro -->
                <div class="absolute inset-0 transform transition-opacity duration-700"
                    :class="{ 'opacity-100': !isDark, 'opacity-0': isDark }">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50">
                        <!-- Patrones y Decoraciones -->
                        <div class="absolute inset-0 opacity-20">
                            <div class="absolute inset-0"
                                style="background-image: radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0); background-size: 32px 32px;">
                            </div>
                        </div>
                        <!-- Efectos de Luz -->
                        <div
                            class="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl animate-float">
                        </div>
                        <div
                            class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full filter blur-3xl animate-float-delayed">
                        </div>
                    </div>
                </div>

                <!-- Fondo Modo Oscuro -->
                <div class="absolute inset-0 transform transition-opacity duration-700"
                    :class="{ 'opacity-100': isDark, 'opacity-0': !isDark }">
                    <div class="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/50 to-purple-950">
                        <!-- Patrones y Decoraciones -->
                        <div class="absolute inset-0 opacity-10">
                            <div class="absolute inset-0"
                                style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 32px 32px;">
                            </div>
                        </div>
                        <!-- Efectos de Luz -->
                        <div
                            class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-float">
                        </div>
                        <div
                            class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-float-delayed">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div class="relative z-10">
                <!-- Header -->
                <header class="py-6 px-6">
                    <div class="max-w-7xl mx-auto">
                        <div class="flex items-center justify-between">
                            <!-- Título con Animación -->
                            <h1 class="text-4xl font-bold animate-fade-in">
                                <span
                                    class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Gestión de Usuarios
                                </span>
                            </h1>

                            <!-- Controles -->
                            <div class="flex items-center gap-4">
                                <!-- Botón Nuevo Usuario -->
                                <button
                                    class="group px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                                    <span class="flex items-center gap-2">
                                        <i
                                            class="fas fa-plus transform group-hover:rotate-90 transition-transform duration-300"></i>
                                        Nuevo Usuario
                                    </span>
                                </button>

                                <!-- Toggle Tema -->
                                <button
                                    class="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm">
                                    <FontAwesomeIcon icon="moon" class="fas fa-moon text-gray-800 dark:text-blue-400" />
                                </button>
                            </div>
                        </div>

                        <!-- Barra de Búsqueda y Filtros -->
                        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Búsqueda -->
                            <div class="relative group">
                                <input type="text" placeholder="Buscar usuarios..."
                                    class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500" />
                                <FontAwesomeIcon icon="search"
                                    class=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                            </div>

                            <!-- Filtros -->
                            <div class="flex gap-4 col-span-2">
                                <select
                                    class="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm">
                                    <option value="">Todos los roles</option>
                                    <option value="admin">Administrador</option>
                                    <option value="user">Usuario</option>
                                    <option value="editor">Editor</option>
                                </select>

                                <select
                                    class="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm">
                                    <option value="">Todos los estados</option>
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Tabla de Usuarios -->
                <main class="px-6 py-8">
                    <div class="max-w-7xl mx-auto">
                        <div
                            class="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 animate-fade-up">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-gray-200 dark:border-gray-700">
                                            <th
                                                class="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                Usuario</th>
                                            <th
                                                class="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                Rol</th>
                                            <th
                                                class="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                Estado</th>
                                            <th
                                                class="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                Último Acceso</th>
                                            <th
                                                class="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            class="group border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <div
                                                        class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold transform group-hover:scale-110 transition-transform duration-300">
                                                        AG
                                                    </div>
                                                    <div>
                                                        <div class="font-medium text-gray-900 dark:text-white">Ana
                                                            García</div>
                                                        <div class="text-sm text-gray-500 dark:text-gray-400">
                                                            ana.garcia@example.com</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span
                                                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 group-hover:scale-105 transition-transform duration-200">
                                                    Admin
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span
                                                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 group-hover:scale-105 transition-transform duration-200">
                                                    Activo
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                Hace 2 horas
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center justify-end gap-2">
                                                    <button
                                                        class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200 group-hover:scale-110">
                                                        <FontAwesomeIcon icon=""
                                                            class="fas fa-edit text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                    <button
                                                        class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200 group-hover:scale-110">
                                                        <FontAwesomeIcon icon="trash"
                                                            class="fas fa-trash text-red-500" />
                                                    </button>
                                                    <button
                                                        class="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-200 group-hover:scale-110">
                                                        <FontAwesomeIcon icon="tools"
                                                            class="fas fa-tools text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <!-- Más filas aquí -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Paginación -->
                            <div
                                class="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                <span class="text-sm text-gray-600 dark:text-gray-400">
                                    Mostrando 1 - 10 de 50 usuarios
                                </span>
                                <div class="flex gap-2">
                                    <button
                                        class="p-2 rounded-lg bg-white/90 dark:bg-gray-700/90 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105">
                                        <FontAwesomeIcon icon="chevron-left"
                                            class="fas fa-chevron-left text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button
                                        class="p-2 rounded-lg bg-white/90 dark:bg-gray-700/90 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105">
                                        <FontAwesomeIcon icon="chevron-right"
                                            class="fas fa-chevron-right text-gray-600 dark:text-gray-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Animaciones Base */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes float-delayed {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Clases de Animación */
.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-up {
    animation: fade-up 0.5s ease-out forwards;
}

.animate-slide-in {
    animation: slide-in 0.3s ease-out forwards;
}

/* Efectos de Fondo */
.bg-gradient-light {
    @apply bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50;
}

.bg-gradient-dark {
    @apply bg-gradient-to-br from-gray-950 via-blue-950/50 to-purple-950;
}

/* Efectos de Glassmorphism */
.glass-light {
    @apply bg-white/80 backdrop-blur-sm;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
    @apply bg-gray-800/80 backdrop-blur-sm;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Efectos de Hover */
.hover-scale {
    @apply transition-transform duration-300 ease-out;
}

.hover-scale:hover {
    @apply transform scale-105;
}

.hover-scale:active {
    @apply transform scale-95;
}

/* Efectos de Grupo */
.group:hover .group-hover-scale {
    @apply transform scale-110 transition-transform duration-300;
}

/* Efectos de Botones */
.btn-primary {
    @apply px-4 py-2 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95;
}

.btn-light {
    @apply bg-white/90 dark:bg-gray-800/90;
}

.btn-gradient {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white;
}

/* Efectos de Input */
.input-primary {
    @apply w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500;
}

/* Efectos de Tabla */
.table-row-hover {
    @apply hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200;
}

/* Badges y Estados */
.badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
}

.badge-admin {
    @apply bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200;
}

.badge-active {
    @apply bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200;
}

/* Sombras Personalizadas */
.shadow-custom {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .shadow-custom {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
        0 2px 4px -1px rgba(0, 0, 0, 0.12);
}

/* Transiciones del Modo Oscuro */
.dark-transition {
    @apply transition-colors duration-300;
}

/* Utilidades de Grid para Fondos */
.grid-pattern {
    background-image: radial-gradient(circle at 2px 2px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 0);
    background-size: 32px 32px;
}

.dark .grid-pattern {
    background-image: radial-gradient(circle at 2px 2px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 0);
}

/* Efectos de Avatar */
.avatar {
    @apply w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold transform transition-transform duration-300;
}

/* Efectos de Scrollbar */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.3);
}
</style>