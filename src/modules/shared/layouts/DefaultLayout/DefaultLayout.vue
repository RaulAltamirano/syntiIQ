<script lang="ts" src="./DefaultLayout.ts"/>

<template>
  <div 
    class="min-h-screen w-full transition-colors duration-300 overflow-x-hidden"
    :class="{ 'dark': isDark }"
  >
  <AnimatedBackground/>

    <Navbar />
    <main> 
      <RouterView v-slot="{ Component }">
        <Transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>