<script lang="ts" src="./PasswordInput.ts"/>

<template>
  <div class="relative space-y-3">    
    <!-- Input Container with enhanced animations -->
    <div 
      ref="inputRef"
      class="relative group rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <!-- Left Icon -->
      <FontAwesomeIcon
        icon="lock"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300
               group-focus-within:text-blue-500 group-hover:text-gray-500"
        size="sm"
      />
      
      <!-- Input field -->
      <input
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        placeholder="Password"
        class="w-full pl-12 pr-12 py-3 rounded-xl border-2 bg-white dark:bg-gray-800
               focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
               transition-all duration-300 ease-out
               dark:border-gray-700 dark:text-white
               placeholder-gray-400 dark:placeholder-gray-500"
        :class="{
          'border-red-400 focus:border-red-500 focus:ring-red-500/20': strengthScore < 2 && modelValue,
          'border-gray-200 dark:border-gray-700': !modelValue || strengthScore >= 2
        }"
      />
      
      <!-- Toggle Password Button -->
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
               hover:text-gray-600 dark:hover:text-gray-300
               transition-colors duration-300"
      >
        <FontAwesomeIcon
          :icon="showPassword ? 'faEyeSlash' : 'faEye'"
          size="sm"
        />
      </button>
    </div>

    <!-- Enhanced Strength Meter -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="showStrength && modelValue" class="space-y-2">
        <!-- Gradient Progress Bar -->
        <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
          <div
            class="h-full transition-all duration-500 ease-out bg-gradient-to-r"
            :class="strengthConfig.gradient"
            :style="{ width: `${strengthPercentage}%` }"
          />
        </div>
        
        <!-- Strength Indicator -->
        <div class="flex items-center space-x-2">
          <FontAwesomeIcon
            :icon="strengthConfig.icon"
            size="sm"
            class="transition-colors duration-300"
            :class="{
              'text-red-500': strengthConfig.level === 'weak',
              'text-yellow-500': strengthConfig.level === 'fair',
              'text-green-500': strengthConfig.level === 'good',
              'text-emerald-600': strengthConfig.level === 'strong'
            }"
          />
          <span 
            class="text-sm font-medium transition-colors duration-300"
            :class="{
              'text-red-500': strengthConfig.level === 'weak',
              'text-yellow-500': strengthConfig.level === 'fair',
              'text-green-500': strengthConfig.level === 'good',
              'text-emerald-600': strengthConfig.level === 'strong'
            }"
          >
            {{ strengthConfig.text }}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>