<script lang="ts" src="./NavbarCheckoutBox.ts" />

<template>
	<nav class="h-full flex flex-col justify-between transition-all duration-300"
		:class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'">
		<!-- Header/Logo Section -->
		<div>
			<div class="p-6">
				<div class="flex items-center justify-between">
					<!-- Logo -->
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
							<span class="text-white font-bold text-xl">S</span>
						</div>
						<div class="flex flex-col">
							<h2 class="text-lg font-bold tracking-tight">SyntiIQ</h2>
							<span class="text-xs opacity-70">Dashboard v2.0</span>
						</div>
					</div>

					<!-- Theme Toggle -->
					<button @click="toggleTheme" class="p-2 rounded-lg transition-all duration-300"
						:class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
						<font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']"
							class="w-5 h-5 transition-transform hover:rotate-45"
							:class="isDark ? 'text-yellow-400' : 'text-gray-600'" />
					</button>
				</div>
			</div>

			<!-- Divider -->
			<div class="mx-4 h-px mb-4" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>

			<!-- Menu Items -->
			<div class="px-4 space-y-1">
				<button v-for="menu in menuItems" :key="menu.id" @click="goTo(menu.id)"
					class="w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all duration-300 group"
					:class="[
						currentView === menu.id
							? isDark
								? 'bg-blue-600/20 text-blue-400'
								: 'bg-blue-50 text-blue-600'
							: isDark
								? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
								: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
					]">
					<div class="relative">
						<font-awesome-icon :icon="menu.icon" class="w-5 h-5 transition-all duration-300"
							:class="currentView === menu.id ? 'scale-110' : 'scale-100'" />
						<div v-if="currentView === menu.id"
							class="absolute -left-2 -right-2 -bottom-2 h-0.5 rounded-full transition-all duration-300"
							:class="isDark ? 'bg-blue-400' : 'bg-blue-600'"></div>
					</div>
					<span class="font-medium">{{ menu.label }}</span>

					<!-- Notification Badge -->
					<div v-if="menu.notifications"
						class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
						{{ menu.notifications }}
					</div>
				</button>
			</div>
		</div>

		<!-- Footer Section -->
		<div class="p-4">
			<!-- User Profile -->
			<div class="p-3 rounded-lg mb-4 flex items-center gap-3" :class="isDark ? 'bg-gray-700/50' : 'bg-gray-50'">
				<div
					class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
					<span class="text-white font-medium">JD</span>
				</div>
				<div class="flex flex-col">
					<span class="font-medium">John Doe</span>
					<span class="text-xs opacity-70">Administrator</span>
				</div>
			</div>

			<!-- Logout Button -->
			<button @click="logout" @mouseenter="isHovered = true" @mouseleave="isHovered = false"
				class="w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all duration-300" :class="isDark
					? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
					: 'text-red-600 hover:bg-red-50 hover:text-red-700'">
				<font-awesome-icon :icon="['fas', 'power-off']" class="w-5 h-5 transition-transform duration-300"
					:class="{ 'rotate-12': isHovered }" />
				<span class="font-medium">Cerrar caja</span>
			</button>
		</div>
	</nav>
	<Teleport to="body">
		<CashClosingModal />
	</Teleport>
</template>