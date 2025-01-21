<script src="./AuthLayout.ts" lang="ts" />


<template>
  <div :class="layoutClasses">
      <div ref="contentRef" class="relative z-10 w-full max-w-md mt-8 sm:mt-16">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition name="fade" mode="out-in" appear @before-enter="handleBeforeEnter"
              @before-leave="handleBeforeLeave">
              <Suspense>
                <div class="transition-wrapper">
                  <component :is="Component" />
                </div>
                <template #fallback>
                  <div class="flex items-center justify-center p-8">
                    <div class="loader"></div>
                  </div>
                </template>
              </Suspense>
            </Transition>
          </template>
        </RouterView>
      </div>
      <ToggleThemeButton />
    </div>

     <!-- Waves SVG con posición fija -->
     <div class="fixed bottom-0 left-0 right-0 w-full pointer-events-none select-none">
      <svg 
        class="w-full h-32 transform transition-transform duration-1000 hover:scale-105"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none">
        <path 
          class="fill-blue-500 dark:fill-blue-600 transition-colors duration-300"
          fill-opacity="0.2" 
          d="M0,192L30,170.7C60,149,120,107,180,90.7C240,75,300,85,360,80C420,75,480,53,540,80C600,107,660,181,720,202.7C780,224,840,192,900,181.3C960,171,1020,181,1080,197.3C1140,213,1200,235,1260,224C1320,213,1380,171,1410,149.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
        </path>
      </svg>
    </div>
</template>


<style scoped>
.transition-wrapper {
  @apply w-full transition-all duration-300;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.loader {
  @apply w-8 h-8 border-4 border-indigo-200 rounded-full;
  border-top-color: theme('colors.indigo.500');
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
