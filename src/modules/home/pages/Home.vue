<script lang="ts" src="./Home.ts" />

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors duration-300">
    <div class="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-16">
      <!-- Título animado -->
      <div ref="titleMotion" class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-black">
          <span 
            class="bg-clip-text text-transparent bg-gradient-to-r"
            :class="isDark ? 'from-blue-300 via-blue-400 to-indigo-300' : 'from-primary via-blue-600 to-indigo-600'"
          >
            Bienvenido a SyntiIQ
          </span>
        </h1>
        <p 
          class="mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
          :class="isDark ? 'text-gray-300' : 'text-gray-600'"
        >
          Descubre las herramientas que potenciarán tu productividad y creatividad.
        </p>
      </div>

      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        name="cards"
        appear
      >
        <CardHome
          v-for="card in cards"
          :key="card.title"
          v-bind="card"
          :isDark="isDark"
          @click="handleCardClick(card.route)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>




<style>
@keyframes blob {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(20px, -20px) scale(1.1);
  }

  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  75% {
    transform: translate(20px, 20px) scale(1.05);
  }
}

.animate-card-enter {
  animation: cardEnter 0.6s ease-out forwards;
  opacity: 0;
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

.animate-title {
  animation: titleEnter 1s ease-out forwards;
}

@keyframes titleEnter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>