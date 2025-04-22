<template>
  <div
    ref="parallaxContainer"
    class="absolute inset-0 w-full h-full"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Overlay con gradiente -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 mix-blend-multiply z-10"
    ></div>
    
    <!-- Imagen con efecto parallax -->
    <transition name="fade" mode="out-in">
      <img
        :key="currentImageIndex"
        :src="currentImage"
        :style="{ transform: `scale(${imageScale}) translate(${parallaxX}px, ${parallaxY}px)` }"
        alt="Imagen de fondo"
        class="w-full h-full object-cover object-center transition-transform duration-300 ease-out"
        @load="handleImageLoad"
      />
    </transition>
    
    <!-- Controles laterales -->
    <div class="absolute inset-y-0 left-4 flex items-center z-20">
      <button 
        @click="prevImage" 
        class="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Imagen anterior"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
    </div>
    
    <div class="absolute inset-y-0 right-4 flex items-center z-20">
      <button 
        @click="nextImage" 
        class="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Siguiente imagen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
    
    <!-- Controles de reproducción e intervalo en la esquina inferior -->
    <div class="absolute bottom-4 right-4 flex items-center gap-2 z-20">
      <button 
        @click="toggleAutoplay" 
        class="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Pausar/Reproducir"
      >
        <svg v-if="autoplay" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
        </svg>
      </button>
      
      <div class="flex items-center bg-black/30 rounded px-2 py-1">
        <input 
          type="range" 
          min="2000" 
          max="10000" 
          step="1000" 
          v-model="intervalTime" 
          class="w-16 h-1"
          @change="updateInterval"
        />
        <span class="text-white text-xs ml-1">{{ intervalTime / 1000 }}s</span>
      </div>
    </div>
    
    <!-- Indicador de carga -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

// Estado principal
const parallaxContainer = ref(null);
const images = ref([]);
const currentImageIndex = ref(0);
const loading = ref(true);
const autoplay = ref(true);
const intervalTime = ref(5000);
const intervalId = ref(null);

// Estado para efecto parallax
const parallaxX = ref(0);
const parallaxY = ref(0);
const targetParallaxX = ref(0);
const targetParallaxY = ref(0);
const imageScale = ref(1.05);
const isHovering = ref(false);
let animationFrameId = null;

// Configuración de Unsplash
const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const fallbackImage = '/images/default-coding-bg.jpg';

// Computar imagen actual
const currentImage = computed(() => {
  if (images.value.length === 0) return fallbackImage;
  return images.value[currentImageIndex.value];
});

// Inicializar datos
onMounted(async () => {
  // Cargar intervalo desde localStorage si existe
  const savedInterval = localStorage.getItem('galleryIntervalTime');
  if (savedInterval) {
    intervalTime.value = parseInt(savedInterval);
  }
  
  // Cargar imágenes iniciales
  await fetchImages();
  
  // Iniciar autoplay
  startAutoplay();
  
  // Configurar el loop de animación para parallax
  startParallaxAnimation();
  
  // Configurar eventos para detección de foco
  window.addEventListener('blur', pauseAutoplay);
  window.addEventListener('focus', resumeAutoplayIfEnabled);
});

// Limpiar al desmontar
onBeforeUnmount(() => {
  stopAutoplay();
  window.removeEventListener('blur', pauseAutoplay);
  window.removeEventListener('focus', resumeAutoplayIfEnabled);
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// Observar cambios en intervalTime para guardar en localStorage
watch(intervalTime, (newValue) => {
  localStorage.setItem('galleryIntervalTime', newValue);
});

// Funciones
async function fetchImages() {
  loading.value = true;
  try {
    if (!unsplashApiKey) {
      throw new Error('API key no disponible');
    }
    
    const response = await fetch(
      'https://api.unsplash.com/photos/random?query=nature&count=5&orientation=landscape',
      {
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    images.value = data.map(item => item.urls.regular);
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
    // Usar imagen de respaldo
    images.value = [fallbackImage];
  } finally {
    loading.value = false;
  }
}

function handleImageLoad() {
  loading.value = false;
}

function nextImage() {
  if (images.value.length <= 1) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
  resetAutoplayTimer();
}

function prevImage() {
  if (images.value.length <= 1) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
  resetAutoplayTimer();
}

function toggleAutoplay() {
  autoplay.value = !autoplay.value;
  if (autoplay.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
}

function startAutoplay() {
  if (intervalId.value) clearInterval(intervalId.value);
  intervalId.value = setInterval(nextImage, intervalTime.value);
}

function stopAutoplay() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

function resetAutoplayTimer() {
  if (autoplay.value) {
    stopAutoplay();
    startAutoplay();
  }
}

function updateInterval() {
  resetAutoplayTimer();
}

function pauseAutoplay() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

function resumeAutoplayIfEnabled() {
  if (autoplay.value && !intervalId.value) {
    startAutoplay();
  }
}

// Efecto parallax mejorado
function handleMouseMove(e) {
  if (!parallaxContainer.value) return;
  isHovering.value = true;
  
  const rect = parallaxContainer.value.getBoundingClientRect();
  
  // Normalizar posición del ratón entre -1 y 1
  const relativeX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  const relativeY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  
  // Definir límites de movimiento para el efecto parallax
  const maxMovement = 10;
  targetParallaxX.value = -relativeX * maxMovement;
  targetParallaxY.value = -relativeY * maxMovement;
}

function handleMouseLeave() {
  isHovering.value = false;
}

function startParallaxAnimation() {
  const animate = () => {
    // Suavizar el movimiento con interpolación
    const ease = 0.08;
    
    if (isHovering.value) {
      parallaxX.value += (targetParallaxX.value - parallaxX.value) * ease;
      parallaxY.value += (targetParallaxY.value - parallaxY.value) * ease;
    } else {
      // Volver lentamente a la posición central cuando no hay hover
      parallaxX.value += (0 - parallaxX.value) * ease * 0.5;
      parallaxY.value += (0 - parallaxY.value) * ease * 0.5;
    }
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  animate();
}
</script>

<style scoped>
/* Transiciones para cambio de imágenes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Controles semi-transparentes que se vuelven más visibles en hover */
button {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

button:hover {
  opacity: 1;
}

/* Mejorar apariencia del slider */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  height: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}
</style>