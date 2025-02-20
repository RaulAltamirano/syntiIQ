<script lang="ts" src="./CashRegister.ts" />

<template>
	<div class="space-y-6">
		<!-- Header con balance y acciones rápidas -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Tarjeta de Balance Actual -->
			<div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 0.5 } }"
				class="rounded-xl shadow-lg transition-all duration-300"
				:class="{ 'bg-gray-800 border-gray-700': isDark, 'bg-white border-gray-200': !isDark }">
				<div class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p :class="{ 'text-gray-400': isDark, 'text-gray-500': !isDark }" class="text-sm font-medium">
								Balance Actual
							</p>
							<h2 :class="{ 'text-gray-100': isDark, 'text-gray-900': !isDark }" class="text-2xl font-bold mt-1">
								${{ currentBalance.toFixed(2) }}
							</h2>
						</div>
						<div :class="{ 'text-green-400': isDark, 'text-green-500': !isDark }">
							<font-awesome-icon icon="dollar-sign" class="w-8 h-8" aria-hidden="true" />
						</div>
					</div>
				</div>
			</div>

			<!-- Botones de acción rápida -->
			<div class="col-span-2 flex gap-4">
				<button v-motion :initial="{ opacity: 0, x: -20 }"
					:enter="{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }"
					@click="openTransactionModal('entrada')"
					class="flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
					:class="{
						'bg-blue-600 hover:bg-blue-700 text-white': isDark,
						'bg-blue-500 hover:bg-blue-600 text-white': !isDark
					}" aria-label="Agregar entrada de dinero">
					<font-awesome-icon icon="arrow-up" class="w-5 h-5" aria-hidden="true" />
					<span class="font-semibold">Entrada</span>
				</button>

				<button v-motion :initial="{ opacity: 0, x: 20 }"
					:enter="{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }"
					@click="openTransactionModal('salida')"
					class="flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
					:class="{
						'bg-red-600 hover:bg-red-700 text-white': isDark,
						'bg-red-500 hover:bg-red-600 text-white': !isDark
					}" aria-label="Registrar salida de dinero">
					<font-awesome-icon icon="arrow-down" class="w-5 h-5" aria-hidden="true" />
					<span class="font-semibold">Salida</span>
				</button>
			</div>
		</div>

		<!-- Filtros y lista de transacciones -->
		<div v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" class="rounded-xl shadow-lg"
			:class="{ 'bg-gray-800 border-gray-700': isDark, 'bg-white border-gray-200': !isDark }">
			<div class="p-4 flex items-center justify-between border-b"
				:class="{ 'border-gray-700': isDark, 'border-gray-200': !isDark }">
				<h3 :class="{ 'text-gray-100': isDark, 'text-gray-900': !isDark }" class="text-lg font-bold">
					Movimientos de Caja
				</h3>
				<div class="flex items-center gap-4">
					<font-awesome-icon icon="filter" :class="{ 'text-gray-400': isDark, 'text-gray-500': !isDark }"
						class="w-5 h-5" />
					<input v-model="filterDate" type="date" class="p-2 rounded-lg border" :class="{
						'bg-gray-700 border-gray-600 text-gray-100': isDark,
						'bg-white border-gray-300 text-gray-900': !isDark
					}" />
				</div>
			</div>

			<div class="p-4">
				<TransitionGroup name="list" tag="div" class="space-y-4">
					<template v-if="filteredTransactions.length">
						<div v-for="transaction in filteredTransactions" :key="transaction.id" v-motion
							:initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="p-4 rounded-lg border" :class="{
								'border-gray-700 bg-gray-750': isDark,
								'border-gray-200 bg-gray-50': !isDark
							}">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<font-awesome-icon :icon="transaction.type === 'entrada' ? 'arrow-up-circle' : 'arrow-down-circle'"
										:class="transaction.type === 'entrada' ? 'text-green-500' : 'text-red-500'" class="w-5 h-5" />
									<div>
										<p :class="{ 'text-gray-100': isDark, 'text-gray-900': !isDark }" class="font-medium">
											{{ transaction.description }}
										</p>
										<p :class="{ 'text-gray-400': isDark, 'text-gray-500': !isDark }" class="text-sm">
											{{ formatTime(transaction.timestamp) }}
										</p>
									</div>
								</div>
								<div class="text-right">
									<p :class="transaction.type === 'entrada' ? 'text-green-500' : 'text-red-500'" class="font-medium">
										{{ transaction.type === 'entrada' ? '+' : '-' }}${{
											transaction.amount.toFixed(2) }}
									</p>
									<p :class="{ 'text-gray-400': isDark, 'text-gray-500': !isDark }" class="text-sm">
										Balance: ${{ transaction.balance.toFixed(2) }}
									</p>
								</div>
							</div>
						</div>
					</template>
					<div v-else class="text-center py-8" :class="{ 'text-gray-400': isDark, 'text-gray-500': !isDark }">
						<font-awesome-icon icon="file-text" class="w-12 h-12 mx-auto mb-2 opacity-50" />
						<p>No hay transacciones para mostrar en esta fecha</p>
					</div>
				</TransitionGroup>
			</div>
		</div>

		<!-- Modal simplificado de nueva transacción -->
		<div v-if="showTransactionModal" class="fixed inset-0 z-50">
			<!-- Overlay -->
			<div class="fixed inset-0 bg-black bg-opacity-50" @click="closeTransactionModal"></div>

			<!-- Modal -->
			<div class="fixed inset-0 flex items-center justify-center p-4">
				<div class="w-full max-w-md rounded-lg p-6" :class="{ 'bg-gray-800': isDark, 'bg-white': !isDark }">
					<h3 class="text-xl font-bold mb-4" :class="{ 'text-gray-100': isDark, 'text-gray-900': !isDark }">
						{{ transactionType === 'entrada' ? 'Nueva Entrada' : 'Nueva Salida' }}
					</h3>

					<form @submit.prevent="handleAddTransaction" class="space-y-4">
						<div>
							<label class="block mb-2" :class="{ 'text-gray-300': isDark, 'text-gray-700': !isDark }">
								Monto
							</label>
							<input v-model="amount" type="number" step="0.01" class="w-full p-2 rounded-lg border" :class="{
								'bg-gray-700 border-gray-600 text-gray-100': isDark,
								'bg-white border-gray-300 text-gray-900': !isDark
							}" required />
						</div>

						<div>
							<label class="block mb-2" :class="{ 'text-gray-300': isDark, 'text-gray-700': !isDark }">
								Descripción
							</label>
							<input v-model="description" type="text" class="w-full p-2 rounded-lg border" :class="{
								'bg-gray-700 border-gray-600 text-gray-100': isDark,
								'bg-white border-gray-300 text-gray-900': !isDark
							}" required />
						</div>

						<div class="flex gap-4 justify-end mt-6">
							<button type="button" @click="closeTransactionModal" class="px-4 py-2 rounded-lg border" :class="{
								'border-gray-600 text-gray-300 hover:bg-gray-700': isDark,
								'border-gray-300 text-gray-900 hover:bg-gray-100': !isDark
							}">
								Cancelar
							</button>
							<button type="submit" class="px-4 py-2 rounded-lg text-white" :class="{
								'bg-blue-600 hover:bg-blue-700': isDark,
								'bg-blue-500 hover:bg-blue-600': !isDark
							}">
								Guardar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>



<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

.list-leave-active {
	position: absolute;
}
</style>