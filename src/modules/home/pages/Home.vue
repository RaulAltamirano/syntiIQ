<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative">

      <HeroSection />
      <FeaturesSection />

      <!-- Decorative elements with reduced visual intensity -->
      <div v-motion="{
        initial: { opacity: 0 },
        enter: {
          opacity: 0.2,
          transition: { delay: 800, duration: 800 }
        }
      }"
        class="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-indigo-200 dark:bg-indigo-800/20 filter blur-3xl -z-10"
        aria-hidden="true"></div>

      <div v-motion="{
        initial: { opacity: 0 },
        enter: {
          opacity: 0.2,
          transition: { delay: 1000, duration: 800 }
        }
      }"
        class="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-800/20 filter blur-3xl -z-10"
        aria-hidden="true"></div>
    </main>
  </div>
</template>

<script setup>
// Importaciones para FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import HeroSection from '../components/HeroSection/HeroSection.vue';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection.vue';
</script>

