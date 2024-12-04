<script lang="ts" src="./Home.ts" />


<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors duration-300">
      <!-- Main Content -->
      <div class="relative flex min-h-screen flex-col items-center justify-center p-16">
        <!-- Title -->
        <h1 class="mb-12 text-4xl sm:text-5xl font-black text-center animate-title relative">
          <span class="bg-clip-text text-transparent bg-gradient-to-r"
            :class="isDark ? 'from-blue-300 via-blue-400 to-indigo-300' : 'from-primary via-blue-600 to-indigo-600'">
            Bienvenido a SyntiIQ
          </span>
        </h1>

        <!-- Cards Grid -->
        <TransitionGroup tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
          name="cards" appear>
          <CardHome v-for="card in cards" 
          :key="card.title" 
          @click=handleCardClick(card.route)
          v-bind="card" :isDark="isDark" />
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