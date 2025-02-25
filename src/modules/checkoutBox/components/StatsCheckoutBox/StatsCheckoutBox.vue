<script src="./StatsCheckoutBox.ts" lang="ts" />
<template>
	<div class="relative">
	  <!-- Botón con mejor posicionamiento e ícono -->
	  <button @click="toggleStats"
		class="absolute -top-2 -right-2 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none z-20"
		:class="[isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100']"
		aria-label="Alternar visibilidad de estadísticas">
		<FontAwesomeIcon :icon="showStats ? 'eye-slash' : 'eye'" class="text-sm" />
	  </button>
	  
	  <!-- Contenedor de estadísticas -->
	  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative">
		<!-- Efecto de desenfoque más moderno con gradiente y animación -->
		<div v-if="!showStats"
		  class="absolute inset-0 z-10 rounded-xl transition-all duration-500 backdrop-blur-md"
		  :class="[isDark ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70' : 'bg-gradient-to-br from-white/70 to-gray-100/70']">
		  <div class="absolute inset-0 bg-opacity-30 flex items-center justify-center">
			<div class="animate-pulse text-center">
			  <FontAwesomeIcon icon="lock" class="text-2xl" :class="[isDark ? 'text-gray-300' : 'text-gray-700']" />
			  <p class="mt-2 text-sm font-medium" :class="[isDark ? 'text-gray-300' : 'text-gray-700']">Haga clic en el ícono para mostrar datos</p>
			</div>
		  </div>
		</div>
		
		<!-- Cards con el estilo original y colores apropiados -->
		<v-motion v-for="(stat, index) in stats" :key="stat.id" 
		  :initial="{ opacity: 0, y: 20 }"
		  :enter="{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }"
		  class="p-4 rounded-lg border transition-all relative" 
		  :class="[isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50 text-gray-800']">
		  
		  <!-- Título y valor con el estilo original -->
		  <p class="text-sm" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">{{ stat.label }}</p>
		  <p class="text-2xl font-bold mt-1">{{ stat.value }}</p>
		  
		  <!-- Indicador de tendencia con el estilo original -->
		  <p v-if="stat.trend !== undefined" class="text-xs mt-2 flex items-center" 
			 :class="stat.trend > 0 ? (stat.isPositive ? 'text-green-500' : 'text-red-500') : 
					(stat.isPositive ? 'text-red-500' : 'text-green-500')">
			<span v-if="stat.trend > 0">↑</span>
			<span v-else>↓</span>
			{{ Math.abs(stat.trend) }}% vs período anterior
		  </p>
		  
		  <!-- Ícono con color específico en esquina superior derecha -->
		  <div v-if="stat.icon" class="absolute top-4 right-4 opacity-70">
			<FontAwesomeIcon :icon="stat.icon" class="text-xl" :style="{ color: stat.color }" />
		  </div>
		</v-motion>
	  </div>
	</div>
  </template>
  
