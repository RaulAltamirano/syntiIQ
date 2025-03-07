<script lang="ts" src="./SalesView.ts" />

<template>
  <StatsCheckoutBox />
  <div class="rounded-xl shadow-lg p-6 transition-all duration-300"
    :class="{ 'bg-white text-gray-900': !isDark, 'bg-gray-800 text-gray-100': isDark }">
    <!-- Header con múltiples carritos -->
    <HeaderCar />
    <!-- Vista principal de ventas -->
    <template v-if="currentView === 'sales'">
      <div class="space-y-4">
        <!-- Búsqueda de productos y escáner -->
        <div class="flex gap-4">
          <SearchProduct class="flex-1" />
          <button @click="openScanner"
            class="p-3 rounded-lg transition-all duration-300 h-12 flex items-center justify-center"
            :class="[isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white']">
            <font-awesome-icon icon="barcode" />
          </button>
        </div>

        <!-- Tabla de productos -->
        <div class="border rounded-lg overflow-hidden transition-all duration-300"
          :class="[isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white']">
          <table class="w-full">
            <thead>
              <tr :class="[isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-900']">
                <th class="p-4 text-left">Producto</th>
                <th class="p-4 text-left">Cantidad</th>
                <th class="p-4 text-left">Precio</th>
                <th class="p-4 text-left">Total</th>
                <th class="p-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup name="list">
                <tr v-for="item in currentCart.items" :key="item.id" class="border-t transition-all duration-300"
                  :class="[isDark ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900']">
                  <td class="p-4">{{ item.name }}</td>
                  <td class="p-4">
                    <div class="flex items-center gap-2">
                      <button @click="decreaseQuantity(item)" class="p-1 rounded transition-colors duration-200"
                        :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200']">
                        <font-awesome-icon icon="minus" />
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item)" class="p-1 rounded transition-colors duration-200"
                        :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200']">
                        <font-awesome-icon icon="plus" />
                      </button>
                    </div>
                  </td>
                  <td class="p-4">${{ item.price }}</td>
                  <td class="p-4">${{ item.price * item.quantity }}</td>
                  <td class="p-4">
                    <div class="flex gap-2">
                      <button @click="applyDiscount(item)"
                        class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        <font-awesome-icon icon="percent" />
                      </button>
                      <button @click="removeItem(item)"
                        class="text-red-500 hover:text-red-700 transition-colors duration-200">
                        <font-awesome-icon icon="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </table>
        </div>

        <!-- Resumen y acciones -->
        <div class="flex justify-between items-start mt-4">
          <div class="space-y-2">
            <button @click="showReturnsModal" class="px-4 py-2 rounded-lg border transition-all duration-300"
              :class="[isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-900 hover:bg-gray-200']">
              <font-awesome-icon icon="undo" class="mr-2" />
              Procesar Devolución
            </button>
            <button @click="holdCart" class="px-4 py-2 rounded-lg border transition-all duration-300 ml-2"
              :class="[isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-900 hover:bg-gray-200']">
              <font-awesome-icon icon="pause" class="mr-2" />
              Pausar Venta
            </button>
          </div>
          <div class="text-right space-y-2">
            <p class="text-lg">Subtotal: ${{ currentCartTotal.subtotal }}</p>
            <p class="text-lg">IVA ({{ taxRate }}%): ${{ currentCartTotal.tax }}</p>
            <p class="text-lg text-green-600" v-if="currentCart.discount">
              Descuento: -${{ currentCart.discount }}
            </p>
            <p class="text-2xl font-bold">Total: ${{ currentCartTotal.total }}</p>
            <div class="flex gap-2 justify-end">
              <button @click="showPaymentOptions" class="px-6 py-3 rounded-lg transition-all duration-300"
                :class="[isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700 text-white']">
                <font-awesome-icon icon="cash-register" class="mr-2" />
                Procesar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>