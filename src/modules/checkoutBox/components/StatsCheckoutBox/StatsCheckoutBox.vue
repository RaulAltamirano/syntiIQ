<script src="./StatsCheckoutBox.ts" lang="ts" />

<template>
	<div class="relative">
		<!-- Botón con ícono para alternar la visibilidad -->
		<button @click="toggleStats"
			class="absolute -top-2 -right-2 p-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 z-20"
			:class="[isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-700']">
			<FontAwesomeIcon :icon="showStats ? 'eye-slash' : 'eye'" />
		</button>

		<!-- Contenedor de estadísticas -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 relative">
			<!-- Efecto de desenfoque cuando los datos están ocultos -->
			<div v-if="!showStats"
				class="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 rounded-xl"></div>

			<!-- Estadísticas -->
			<v-motion v-for="(stat, index) in stats" :key="stat.id" :initial="{ opacity: 0, y: 20 }"
				:enter="{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }"
				class="p-4 rounded-xl shadow-sm transition-all duration-300"
				:class="[isDark ? 'bg-gray-800 text-white' : 'bg-white']">
				<div class="flex items-center">
					<!-- Icono con color dinámico -->
					<div class="mr-4" :style="{ color: stat.color }">
						<FontAwesomeIcon :icon="stat.icon" />
					</div>
					<div>
						<h3 class="text-sm text-gray-500">{{ stat.label }}</h3>
						<p class="text-2xl font-bold mt-1">{{ stat.value }}</p>
					</div>
				</div>
			</v-motion>
		</div>
	</div>
</template>

