<script lang="ts" src="./Home.ts" />


<template>
  <div 
    :class="{'dark': isDark}"
    class="min-h-screen transition-colors duration-300"
  >
    <div class="relative min-h-screen overflow-hidden">
      <!-- Light Mode Background -->
      <div 
        class="absolute inset-0 transition-all duration-500"
        :class="{'opacity-100': !isDark, 'opacity-0': isDark}"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div class="absolute inset-0">
            <svg class="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="light-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0h40v40H0V0z" fill="none"/>
                  <circle cx="20" cy="20" r="1" fill="#1D4ED8" fill-opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#light-grid)"/>
            </svg>
            
            <!-- Light Mode Ambient Effects -->
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-float"></div>
            <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-success/5 rounded-full filter blur-3xl animate-float-delayed"></div>
            <div class="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-400/5 rounded-full filter blur-3xl animate-float-slow"></div>
          </div>
        </div>
      </div>

      <!-- Dark Mode Background -->
      <div 
        class="absolute inset-0 transition-all duration-500"
        :class="{'opacity-100': isDark, 'opacity-0': !isDark}"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950">
          <div class="absolute inset-0">
            <svg class="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dark-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0h40v40H0V0z" fill="none"/>
                  <circle cx="20" cy="20" r="1" fill="#60A5FA"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dark-grid)"/>
            </svg>

            <!-- Dark Mode Ambient Effects -->
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-float"></div>
            <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl animate-float-delayed"></div>
            <div class="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-float-slow"></div>
          </div>
        </div>
      </div>

      <!-- Theme Toggle -->
      <button 
        @click="toggleTheme"
        class="fixed top-4 right-4 p-3 rounded-full transition-all duration-300 z-50 bg-white/20 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 dark:bg-gray-800/30"
      >
        <font-awesome-icon 
          :icon="isDark ? 'sun' : 'moon'" 
          class="text-xl text-gray-800 dark:text-blue-300"
        />
      </button>

      <!-- Main Content -->
      <div class="relative flex min-h-screen flex-col items-center justify-center p-6">
        <!-- Title -->
        <h1 class="mb-12 text-4xl sm:text-5xl font-black text-center animate-title relative">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-indigo-600 dark:from-blue-300 dark:via-blue-400 dark:to-indigo-300">
            Bienvenido a SyntiIQ
          </span>
        </h1>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <template v-for="(card, index) in cards" :key="index">
            <div 
              @click="handleCardClick(card)"
              @mouseenter="card.isHovered = true"
              @mouseleave="card.isHovered = false"
              class="group relative backdrop-blur-lg rounded-xl transition-all duration-300 hover:-translate-y-1"
              :class="{
                'animate-card-enter': !isLoading,
                'light-card': !isDark,
                'dark-card': isDark
              }"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <!-- Card Inner Container -->
              <div class="p-6 relative z-10">
                <!-- Icon Container -->
                <div 
                  class="w-16 h-16 mx-auto rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                  :class="[getIconClass(card.iconBg)]"
                >
                  <font-awesome-icon 
                    :icon="card.icon" 
                    class="text-2xl text-white"
                  />
                </div>

                <!-- Title -->
                <h2 class="mt-4 text-xl font-bold text-center transition-colors duration-300"
                    :class="{'text-gray-800 group-hover:text-primary': !isDark, 'text-white group-hover:text-blue-300': isDark}">
                  {{ card.title }}
                </h2>

                <!-- Description -->
                <p class="mt-2 text-sm text-center transition-colors duration-300"
                   :class="{'text-gray-600 group-hover:text-gray-800': !isDark, 'text-gray-300 group-hover:text-gray-100': isDark}">
                  {{ card.description }}
                </p>
              </div>

              <!-- Interactive Background -->
              <div 
                class="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                :class="{'bg-gradient-to-br from-white/50 to-primary/5': !isDark, 'bg-gradient-to-br from-blue-400/10 to-transparent': isDark}"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
.card {
  cursor: pointer;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
  transition: background-color 0.3s, transform 0.3s;
}

.group:hover .icon {
  transform: scale(1.1);
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  transition: color 0.3s;
}

.description {
  font-size: 0.875rem;
  text-align: center;
  color: #4b5563;
  margin-top: 0.5rem;
}

@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(20px, 20px) scale(1.05); }
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

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #1D4ED8;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dark .loading-spinner {
  border-color: #60A5FA;
  border-top-color: transparent;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.blob-1 { width: 400px; height: 400px; }
.blob-2 { width: 300px; height: 300px; }
.blob-3 { width: 350px; height: 350px; }
.blob-4 { width: 450px; height: 450px; }

/* Animaciones de fondo */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 15px); }
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, 15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

</style>