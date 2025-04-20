<script lang="ts" src="./SalesView.ts" />

<template>
  <StatsCheckoutBox />

  <!-- Contenedor principal mejor estructurado -->
  <div class="relative"> <!-- Contenedor relativo para el botón flotante -->
    <div
      class="rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <!-- Header -->
      <HeaderCar />

      <!-- Vista de ventas -->
      <template v-if="currentView === 'sales'">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Contenedor izquierdo (tabla de productos) -->
          <div class="lg:flex-1">
            <!-- Búsqueda y escáner -->
            <div class="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchProduct class="flex-1" />
              <button @click="openScanner"
                class="h-12 px-4 rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
                aria-label="Abrir escáner de productos">
                <font-awesome-icon icon="barcode" class="mr-2" />
                <span class="hidden sm:inline">Escanear</span>
              </button>
            </div>

            <!-- Tabla de productos con contenedor scrollable -->
            <section
              class="border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              aria-labelledby="cart-heading">

              <h2 id="cart-heading" class="sr-only">Carrito de compras</h2>

              <div class="overflow-x-auto max-h-[calc(100vh-400px)] lg:max-h-[calc(100vh-250px)]" role="region"
                aria-label="Lista de productos en carrito" tabindex="0">
                <table class="min-w-full text-sm" v-if="currentCart && currentCart.length">
                  <caption class="sr-only">Lista de productos en el carrito</caption>
                  <thead class="sticky top-0 z-10">
                    <tr class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <th scope="col" class="p-4 text-left font-medium">Producto</th>
                      <th scope="col" class="p-4 text-left font-medium">Cantidad</th>
                      <th scope="col" class="p-4 text-left font-medium">Precio</th>
                      <th scope="col" class="p-4 text-left font-medium">Total</th>
                      <th scope="col" class="p-4 text-left font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in currentCart" :key="item.productId"
                      class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/70 text-gray-800 dark:text-gray-200">

                      <td class="p-4 truncate max-w-[200px]">{{ item.name || 'Producto sin nombre' }}</td>

                      <!-- Cantidad -->
                      <td class="p-4">
                        <div class="flex items-center gap-2">
                          <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1"
                            class="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Reducir cantidad de producto">
                            <font-awesome-icon icon="minus" />
                            <span class="sr-only">Reducir cantidad</span>
                          </button>
                          <span class="min-w-[20px] text-center" aria-live="polite">
                            {{ item.quantity }}
                          </span>
                          <button @click="increaseQuantity(item)"
                            class="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Aumentar cantidad de producto">
                            <font-awesome-icon icon="plus" />
                            <span class="sr-only">Aumentar cantidad</span>
                          </button>
                        </div>
                      </td>

                      <td class="p-4">
                        {{ item.price ? `$${parseFloat(item.price).toFixed(2)}` : 'N/A' }}
                      </td>

                      <td class="p-4 font-semibold">
                        {{ item.price ? `$${(parseFloat(item.price) * item.quantity).toFixed(2)}` : 'N/A' }}
                      </td>

                      <!-- Acciones -->
                      <td class="p-4">
                        <div class="flex gap-2">
                          <button @click="applyDiscount(item)"
                            class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Aplicar descuento">
                            <font-awesome-icon icon="percent" />
                          </button>
                          <button @click="removeItem(item)"
                            class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Eliminar producto">
                            <font-awesome-icon icon="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Estado vacío -->
                <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400" aria-live="polite">
                  <div class="mb-4">
                    <font-awesome-icon icon="shopping-cart" class="text-3xl opacity-50" />
                  </div>
                  <p class="font-medium">No hay productos en el carrito.</p>
                  <p class="text-sm mt-2">Agrega productos para comenzar</p>
                </div>
              </div>
            </section>
          </div>

          <!-- Resumen en sidebar para desktop -->
          <div class="lg:w-80 lg:sticky lg:top-4 lg:self-start">
            <section class="border rounded-xl p-4 bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600">
              <h2 class="text-lg font-semibold mb-4">Resumen de compra</h2>
              <div class="space-y-3">
                <p class="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${{ carTotal }}</span>
                </p>
                <p v-if="cartDiscountTotal" class="flex justify-between text-green-600 dark:text-green-400">
                  <span>Descuento:</span>
                  <span>-${{ cartDiscountTotal }}</span>
                </p>
                <p class="flex justify-between text-xl font-bold border-t pt-3 border-gray-200 dark:border-gray-600">
                  <span>Total:</span>
                  <span>${{ carTotal }}</span>
                </p>

                <!-- Botón de pago para desktop -->
                <button @click="showPaymentOptions"
                  class="w-full mt-4 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Procesar pago">
                  <font-awesome-icon icon="cash-register" class="mr-2" />
                  Procesar Pago
                </button>
              </div>
            </section>
          </div>
        </div>
      </template>
    </div>

    <!-- Botón flotante de pago para mobile -->
    <button v-if="currentView === 'sales' && currentCart && currentCart.length" @click="showPaymentOptions"
      class="fixed bottom-6 right-6 lg:hidden z-50 px-6 py-3 rounded-full shadow-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Procesar pago">
      <font-awesome-icon icon="cash-register" class="mr-2" />
      <span class="font-medium">Pagar</span>
      <span class="ml-2 font-bold">${{ carTotal }}</span>
    </button>
  </div>
  <CashClosingModal :shiftData="currentShift" :userData="currentUser" @confirm-closing="handleCashClosing" />
  <PaymentModalDetails :visible="showModal" :subtotal="carTotal" :discount="cartDiscountTotal"
    @close="showModal = false" @pay="handlePayment" />
</template>
