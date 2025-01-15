<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="text-center animate-fade-in">
        <h1 class="text-9xl font-bold text-gray-900 animate-float">404</h1>
        <p class="mt-4 text-2xl text-gray-600 animate-slide-up">Página no encontrada</p>
        <p class="mt-2 text-gray-500 animate-slide-up delay-100">Lo sentimos, la página que buscas no existe</p>
        <router-link 
          to="/" 
          class="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
        >
          Volver al inicio
        </router-link>
      </div>
    </div>
  </template>


<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 100ms;
}
</style>