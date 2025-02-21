<script lang="ts" src="./CustomerCredit.ts"/>

<template>
  <div class="rounded-xl shadow-lg p-6 transition-all duration-300"
    :class="{ 'bg-white text-gray-900': !isDark, 'bg-gray-800 text-gray-100': isDark }">
    
    <!-- Encabezado -->
    <div class="flex justify-end items-center mb-6">
      <!-- <h2 class="text-2xl font-bold">Gestión de Créditos</h2> -->
      <button @click="openNewCreditForm"
        class="px-4 py-2 rounded-lg transition-all duration-300"
        :class="[isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white']">
        <font-awesome-icon icon="plus" class="mr-2" />
        Nuevo Crédito
      </button>
    </div>

    <!-- Resumen de Créditos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="p-4 rounded-lg transition-all duration-300"
        :class="[isDark ? 'bg-gray-700' : 'bg-gray-100']">
        <h3 class="text-lg font-semibold mb-2">Créditos Activos</h3>
        <p class="text-2xl font-bold">{{ activeCredits.length }}</p>
      </div>
      
      <div class="p-4 rounded-lg transition-all duration-300"
        :class="[isDark ? 'bg-gray-700' : 'bg-gray-100']">
        <h3 class="text-lg font-semibold mb-2">Límite de Crédito</h3>
        <p class="text-2xl font-bold">${{ creditLimit }}</p>
      </div>
      
      <div class="p-4 rounded-lg transition-all duration-300"
        :class="[isDark ? 'bg-gray-700' : 'bg-gray-100']">
        <h3 class="text-lg font-semibold mb-2">Créditos Vencidos</h3>
        <p class="text-2xl font-bold text-red-500">
          {{ activeCredits.filter(c => calculateCreditStatus(c) === 'Atrasado').length }}
        </p>
      </div>
    </div>

    <!-- Tabla de Créditos -->
    <div v-motion="tableMotion" 
      class="border rounded-lg overflow-hidden transition-all duration-300"
      :class="[isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white']">
      <table class="w-full">
        <thead>
          <tr :class="[isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-900']">
            <th class="p-4 text-left">Cliente</th>
            <th class="p-4 text-left">Monto Total</th>
            <th class="p-4 text-left">Restante</th>
            <th class="p-4 text-left">Progreso</th>
            <th class="p-4 text-left">Estado</th>
            <th class="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="credit in activeCredits" 
            :key="credit.id"
            class="border-t transition-all duration-300"
            :class="[isDark ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900']">
            <td class="p-4">{{ credit.clientName }}</td>
            <td class="p-4">${{ credit.amount }}</td>
            <td class="p-4">${{ credit.remainingAmount }}</td>
            <td class="p-4">
              <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-blue-600 h-2.5 rounded-full"
                  :style="{ width: `${calculateProgress(credit)}%` }">
                </div>
              </div>
            </td>
            <td class="p-4">
              <span class="px-2 py-1 rounded-full text-sm"
                :class="{
                  'bg-green-100 text-green-800': calculateCreditStatus(credit) === 'Al día',
                  'bg-red-100 text-red-800': calculateCreditStatus(credit) === 'Atrasado'
                }">
                {{ calculateCreditStatus(credit) }}
              </span>
            </td>
            <td class="p-4">
              <div class="flex gap-2">
                <button @click="showPaymentHistory(credit)"
                  class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                  <font-awesome-icon icon="history" />
                </button>
                <button @click="registerPayment(credit)"
                  class="text-green-500 hover:text-green-700 transition-colors duration-200">
                  <font-awesome-icon icon="money-bill" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>