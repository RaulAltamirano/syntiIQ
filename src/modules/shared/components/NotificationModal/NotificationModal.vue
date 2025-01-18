<script src="./NotificationModal.ts" lang="ts"/>

<template>
  <div class="notification-container">
    <TransitionGroup name="fade-advanced" tag="div" class="notification-group">
      <div v-for="notification in notifications" :key="notification.id" :class="getPositionStyles(notification.position)">
        <div :class="[
          'rounded-lg shadow-lg border-l-4 p-4',
          {
            'bg-green-100 border-green-500 dark:bg-green-800 dark:border-green-400': notification.type === 'success',
            'bg-red-100 border-red-500 dark:bg-red-800 dark:border-red-400': notification.type === 'error',
            'bg-yellow-100 border-yellow-500 dark:bg-yellow-800 dark:border-yellow-400': notification.type === 'warning',
            'bg-blue-100 border-blue-500 dark:bg-blue-800 dark:border-blue-400': notification.type === 'info'
          },
          isDark ? 'shadow-black/25' : 'shadow-gray-700/50'
        ]">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="[
                'flex-shrink-0',
                {
                  'text-green-600 dark:text-green-300': notification.type === 'success',
                  'text-red-600 dark:text-red-300': notification.type === 'error',
                  'text-yellow-600 dark:text-yellow-300': notification.type === 'warning',
                  'text-blue-600 dark:text-blue-300': notification.type === 'info'
                }
              ]">
                <FontAwesomeIcon :icon="getIcon(notification.type)" class="h-5 w-5" />
              </div>
              <div class="ml-3">
                <h3 :class="['text-sm font-medium', isDark ? 'text-gray-100' : 'text-gray-100']">
                  {{ notification.title }}
                </h3>
                <p :class="['mt-1 text-sm', isDark ? 'text-gray-300' : 'text-gray-300']">
                  {{ notification.message }}
                </p>
              </div>
            </div>
            <button @click="remove(notification.id)" 
              class="ml-4 inline-flex focus:outline-none transform transition-transform duration-200 hover:rotate-90"
              :class="isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-100 hover:text-gray-400'">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

.notification-group {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.notification-item {
  position: absolute;
  max-width: 24rem;
  width: 100%;
  pointer-events: auto;
  margin: 0.5rem;
}

.notification-top-right {
  top: 0;
  right: 0;
}

.notification-top-left {
  top: 0;
  left: 0;
}

.notification-bottom-right {
  bottom: 0;
  right: 0;
}

.notification-bottom-left {
  bottom: 0;
  left: 0;
}

.notification-top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.notification-bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.fade-advanced-enter-active,
.fade-advanced-leave-active {
  transition: all 0.5s ease-out;
}

.fade-advanced-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-advanced-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

[class*="notification-"] > div {
  margin-bottom: 1rem;
}
</style>