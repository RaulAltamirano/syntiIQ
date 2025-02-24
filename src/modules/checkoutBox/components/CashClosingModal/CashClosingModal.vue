<script src="./CashClosingModal.ts" lang="ts"/>

<template>
  <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Overlay con animación -->
    <div 
      v-motion="{ 
        initial: { opacity: 0 }, 
        enter: { opacity: 1 },
        leave: { opacity: 0 }
      }"
      class="absolute inset-0 bg-black bg-opacity-50"
      @click="closeModal"
    ></div>

    <!-- Modal Container -->
    <div 
      v-motion="{ 
        initial: { opacity: 0, scale: 0.95, y: 20 },
        enter: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { duration: 300 }
        },
        leave: { 
          opacity: 0, 
          scale: 0.95, 
          y: 20 
        }
      }"
      class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl transition-all"
      :class="{ 'bg-white text-gray-900': !isDark, 'bg-gray-800 text-gray-100': isDark }"
    >
      <!-- Header -->
      <header class="sticky top-0 z-10 flex items-center justify-between p-4 border-b"
        :class="[isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <h2 class="text-xl font-bold">Cierre de Caja</h2>
        <button 
          @click="closeModal"
          class="p-2 rounded-lg transition-colors"
          :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100']"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div class="p-4 space-y-6">
        <!-- Resumen de Ventas -->
        <section 
          v-motion="{ 
            initial: { opacity: 0, x: -20 },
            enter: { opacity: 1, x: 0, transition: { delay: 100 } }
          }"
          class="space-y-4"
        >
          <h3 class="text-lg font-semibold">📊 Resumen de Ventas</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
            
            <StatCardCloseCheckout title="Total en Efectivo" :value="formatCurrency(totalCash)" />
            <StatCardCloseCheckout title="Total con Tarjeta" :value="formatCurrency(totalCard)" />
            <StatCardCloseCheckout title="Otros Métodos" :value="formatCurrency(totalOther)" />
            <StatCardCloseCheckout title="Transacciones" :value="totalTransactions" />
          </div>
        </section>

        <!-- Saldos -->
        <section 
          v-motion="{ 
            initial: { opacity: 0, x: -20 },
            enter: { opacity: 1, x: 0, transition: { delay: 200 } }
          }"
          class="space-y-4"
        >
          <h3 class="text-lg font-semibold">💰 Saldos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatCardCloseCheckout title="Saldo Inicial" :value="formatCurrency(initialBalance)" />
            <StatCardCloseCheckout title="Saldo Final" :value="formatCurrency(finalBalance)" />
          </div>
        </section>

        <!-- Diferencias -->
        <section 
          v-motion="{ 
            initial: { opacity: 0, x: -20 },
            enter: { opacity: 1, x: 0, transition: { delay: 300 } }
          }"
          class="space-y-4"
        >
          <h3 class="text-lg font-semibold">⚖️ Diferencias</h3>
          <div class="p-4 rounded-lg border"
            :class="[isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50']">
            <p class="text-2xl font-bold" :class="difference < 0 ? 'text-red-500' : 'text-green-500'">
              {{ formatCurrency(difference) }}
            </p>
            <textarea
              v-model="adjustmentNotes"
              placeholder="Notas de ajustes..."
              class="w-full mt-3 p-2 rounded-lg resize-none transition-all"
              :class="[isDark ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-200']"
              rows="3"
            ></textarea>
          </div>
        </section>

        <!-- Lista de Movimientos -->
        <TransitionGroup 
          tag="section"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          class="space-y-4"
        >
          <h3 class="text-lg font-semibold">💸 Movimientos</h3>
          <div class="space-y-2">
            <div
              v-for="movement in movements"
              :key="movement.id"
              class="p-3 rounded-lg border flex justify-between items-center"
              :class="[isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50']"
            >
              <span>{{ movement.description }}</span>
              <span :class="movement.type === 'income' ? 'text-green-500' : 'text-red-500'">
                {{ formatCurrency(movement.amount) }}
              </span>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer -->
      <footer class="sticky bottom-0 z-10 p-4 border-t flex justify-end gap-3"
        :class="[isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <button 
          @click="closeModal"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="[isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200']"
        >
          Cancelar
        </button>
        <button 
          @click="confirmClose"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Confirmar Cierre
        </button>
      </footer>
    </div>
  </div>
</template>