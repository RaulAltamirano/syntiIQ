<script lang="ts" src="./App.ts"/>

<template>
  <div id="app">
    <main>
      <RouterView />
    </main>
    <NotificationModal/>
  </div>
</template>

<style>

body {
  @apply antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animaciones de transición entre páginas */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>