<script lang="ts" src="./Register.ts"/>

<template>
  <div class=" flex items-center justify-center">
    <div class="bg-white dark:bg-[#1f2937] p-6 rounded-2xl shadow-md w-full max-w-[360px] relative">
      <!-- Header -->
      <div class="text-center mb-5">
        <h2 class="text-[#1a1a1a] dark:text-white text-2xl font-semibold mb-1">
          Create account
        </h2>
        <p class="text-[#666] dark:text-[#9ca3af] text-sm">
          Get started for free
        </p>
      </div>

      <SocialAuth />

      <!-- Divider -->
      <div class="flex items-center text-center my-4 text-[#9ca3af] text-sm">
        <div class="flex-1 border-b border-[#e5e7eb] dark:border-[#4b5563]"></div>
        <span class="px-3">or</span>
        <div class="flex-1 border-b border-[#e5e7eb] dark:border-[#4b5563]"></div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
    <input
      v-model="name"
      type="text"
      required
      placeholder="Full name"
      class="w-full py-2.5 px-3 border border-[#e5e7eb] dark:border-[#4b5563] rounded-lg text-sm transition-all duration-200 
    text-gray-900 dark:text-gray-100
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    bg-white dark:bg-[#374151]
    focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-10"    >
  </div>
  <div class="mb-4">
    <input
      v-model="email"
      type="email"
      required
      placeholder="Email address"
      class="w-full py-2.5 px-3 border border-[#e5e7eb] dark:border-[#4b5563] rounded-lg text-sm transition-all duration-200 
    text-gray-900 dark:text-gray-100
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    bg-white dark:bg-[#374151]
    focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-10"    >
  </div>

        <div class="mb-4">
          <PasswordInput v-model="password" :show-strength="true" />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-2.5 px-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Sign up</span>
          <FontAwesomeIcon v-else icon="spinner" class="animate-spin" />
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center mt-4 text-[#374151] dark:text-[#e5e7eb] text-sm">
        Already have an account?
        <RouterLink 
          to="/auth/login"
          class="text-[#3b82f6] font-medium ml-1 hover:underline"
        >
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
