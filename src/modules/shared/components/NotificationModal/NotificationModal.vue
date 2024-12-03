<script src="./NotificationModal.ts" lang="ts"/>

<template>
  <div class="notification-container">
    <Transition
      :css="false"
    >
      <div
        v-if="isOpen"
        ref="notificationRef"
        class="fixed z-50 max-w-sm w-full notification-wrapper"
        :class="[position]"
      >
        <div
          :class="[
            'rounded-lg shadow-lg border-l-4 p-4 transform',
            getTypeStyles
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="['flex-shrink-0', getIconColor]">
                <!-- Icono de éxito -->
                <svg
                  v-if="type === 'success'"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Icono de error -->
                <svg
                  v-else-if="type === 'error'"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Icono de advertencia -->
                <svg
                  v-else-if="type === 'warning'"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Icono de información -->
                <svg
                  v-else
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium dark:text-white">
                  {{ title }}
                </h3>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-200">
                  {{ message }}
                </p>
              </div>
            </div>
            <button
              @click="handleClose"
              class="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none transform transition-transform duration-200 hover:rotate-90"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>


<style scoped>
.notification-container {
  position: fixed;
  z-index: 50;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.notification-wrapper {
  pointer-events: auto;
}

.top-right {
  top: 1rem;
  right: 1rem;
}

.top-left {
  top: 1rem;
  left: 1rem;
}

.bottom-right {
  bottom: 1rem;
  right: 1rem;
}

.bottom-left {
  bottom: 1rem;
  left: 1rem;
}

.top-center {
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-center {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>