<script lang="ts" src="./TitleCard.ts"/>

<template>
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center gap-4">
      <button @click="router.back()" 
        class="p-2 rounded-lg transition-all duration-300 hover:scale-110 group"
        :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'">
        <font-awesome-icon icon="arrow-left" 
          class="transition-transform duration-300 group-hover:-translate-x-1" />
      </button>
      <h2 class="text-3xl font-bold transition-all duration-300" 
        :class="[isDark 
          ? 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-blue-200'
          : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-600 to-blue-400']">
        {{name}}
      </h2>
    </div>
  </div>
</template>