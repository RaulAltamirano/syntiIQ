<script lang="ts" src="./CardHome.ts" />

<template>
  <div class="group relative transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- Glass morphism background -->
    <div class="absolute inset-0 rounded-xl" :class="isDark ? 'bg-gray-900/40' : 'bg-white shadow-lg'"></div>

    <!-- Content -->
    <div class="p-6 relative z-10">
      <!-- Icon with floating animation -->
      <div class=" w-16 h-16 mx-auto rounded-xl flex items-center justify-center" :class="[iconBg]">
        <font-awesome-icon :icon="icon" class="text-2xl text-white transform transition-all duration-500"
          :class="{ 'scale-110': isHovered }" />
      </div>

      <!-- Title with gradient hover -->
      <h2 class="mt-4 text-xl font-bold text-center transition-all duration-300" :class="[
        isDark
          ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-blue-200'
          : 'text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-primary to-blue-600'
      ]">
        {{ title }}
      </h2>

      <!-- Description -->
      <p class="mt-2 text-sm text-center transition-colors duration-300"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        {{ description }}
      </p>
    </div>

    <!-- Hover effects -->
    <div class="absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100" :class="[
      isDark
        ? 'bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent'
        : 'bg-gradient-to-br from-primary/5 via-blue-400/5 to-transparent'
    ]"></div>
  </div>
</template>


<style scoped>
.animate-card-enter {
  animation: cardEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>