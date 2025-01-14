<script lang="ts" src="./AnimatedBackground.ts" />


<template>
  <div @mousemove="handleMouseMove">
    <!-- Light Theme -->
    <Transition name="theme">
      <div v-show="!isDark" class="absolute inset-0">
        <div class="relative w-full h-screen overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50 via-zinc-50 to-indigo-50">
            <div class="absolute inset-0">
              <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#6366F110_1px,transparent_1px),linear-gradient(to_bottom,#6366F110_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div
                class="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.06),transparent_100%)]"
                :style="`--mouse-x: ${mousePosition.x}px; --mouse-y: ${mousePosition.y}px`" />
            </div>

            <div class="fixed top-0 -left-48 w-80 h-80">
              <div
                class="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-sky-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-[spin_100s_linear_infinite] will-change-transform" />
            </div>

            <div class="fixed -left-32 top-0 w-40 h-40">
              <div class="w-full h-full">
                <div
                  class="absolute bg-gradient-to-br from-violet-400/20 via-indigo-400/20 to-teal-400/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-morph will-change-transform" />
              </div>
            </div>

            <div class="fixed right-0 top-1/3 w-35 h-35">
              <div class="w-full h-full">
                <div
                  class="absolute bg-gradient-to-bl from-sky-400/20 via-emerald-400/20 to-indigo-400/20 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] blur-3xl animate-morph-delayed will-change-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Dark Theme -->
    <Transition name="theme">
      <div v-show="isDark" class="absolute inset-0">
        <div class="absolute inset-0 transition-all duration-500"
          :class="{ 'opacity-100': isDark, 'opacity-0': !isDark }">
          <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div class="absolute inset-0">
              <svg class="absolute inset-0 w-full h-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dark-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 0h40v40H0V0z" fill="none" />
                    <circle cx="20" cy="20" r="1" fill="#60A5FA" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dark-grid)" />
              </svg>

              <!-- Dark Mode Ambient Effects -->
              <div
                class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-4xl animate-float">
              </div>
              <div
                class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-4xl animate-float-delayed">
              </div>
              <div
                class="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full filter blur-4xl animate-float-slow">
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.theme-enter-active,
.theme-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-enter-from,
.theme-leave-to {
  opacity: 0;
}

@keyframes morph {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(0) rotate(0deg);
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: translate(-20px, 20px) rotate(3deg);
  }

  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(0) rotate(0deg);
  }
}

@keyframes morph-delayed {
  0% {
    border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
    transform: translate(0) rotate(0deg);
  }

  50% {
    border-radius: 70% 30% 40% 60% / 30% 40% 60% 70%;
    transform: translate(20px, -20px) rotate(-3deg);
  }

  100% {
    border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
    transform: translate(0) rotate(0deg);
  }
}

.animate-morph {
  animation: morph 25s infinite ease-in-out;
}

.animate-morph-delayed {
  animation: morph-delayed 30s infinite ease-in-out;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(10px, -10px);
  }
}

@keyframes float-delayed {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-15px, 15px);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(15px, 15px);
  }
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