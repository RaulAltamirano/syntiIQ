<script lang="ts" src="./TitleCard.ts" />

<template>
  <div ref="motionElement" class="backdrop-blur-sm shadow-sm">
    <div
      class="relative w-full flex items-center justify-between p-5 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md">
      <!-- Back Button -->
      <div class="relative group">
        <button @click="$router.go(-1)"
          class="p-3 rounded-lg transition-all bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center shadow-md">
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="text-lg text-gray-600 dark:text-gray-300" />
        </button>
        <span
          class="absolute left-full ml-2 px-3 py-1 text-xs bg-gray-800 text-white rounded-md opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
          Regresar
        </span>
      </div>

      <!-- Title with Icon -->
      <div class="flex items-center gap-3">
        <FontAwesomeIcon :icon="['fas', icon]" class="text-2xl text-blue-600 dark:text-blue-400" />
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
          {{ title }}
        </h2>
      </div>

      <!-- Dynamic Actions -->
      <div class="flex gap-2">
        <button v-for="(action, index) in actions" :key="index" @click="action.click"
          class="p-3 rounded-lg transition-all bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center shadow-md">
          <FontAwesomeIcon :icon="['fas', action.icon]" class="text-lg text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  </div>
</template>

