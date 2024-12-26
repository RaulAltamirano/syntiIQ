<script lang="ts" src="./CheckoutBox.ts" />

<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
    <!-- Contenedor Principal -->
    <div class="flex flex-col bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full space-y-6 relative">
      <!-- Título -->
      <h2 class="text-3xl font-bold text-gray-800">Caja Física</h2>

      <!-- Input para Código de Barras -->
      <div class="flex items-center space-x-4">
        <SearchProduct class="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          :products="products" @product-selected="handleProductSelected" @keydown.enter="addProductByBarcode" />
        <button @click="addProductByBarcode"
          class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Agregar Producto
        </button>
      </div>

      <!-- Sección Superior -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <!-- Lista de Productos -->
        <div class="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 w-full lg:w-2/3">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Productos en la Caja</h3>
          <div style="max-height: calc(100vh - 200px);"
            class="flex flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div v-for="item in cartItems" :key="item.id"
              class="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 class="font-semibold text-gray-700">{{ item.name }}</h4>
                  <p class="text-gray-500 text-sm">{{ item.description }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end space-y-2">
                <p class="text-gray-700 font-semibold">${{ item.price }}</p>
                <button @click="removeItem(item.id)" class="text-red-500 hover:underline text-sm">
                  Quitar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Herramientas de Cajera -->
        <div class="bg-white rounded-xl shadow-lg p-6 w-full lg:w-1/3 relative overflow-hidden">
          <!-- Background animated pattern -->
          <div class="absolute inset-0 z-0 opacity-5">
            <div v-for="i in 10" :key="i" class="absolute bg-gray-900 rounded-full" :style="{
              width: `${Math.random() * 20}px`,
              height: `${Math.random() * 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s infinite`
            }"></div>
          </div>

          <!-- Header with floating animation -->
          <div class="flex items-center justify-between mb-6 relative z-10">
            <h3 class="text-xl font-bold text-gray-800 animate-float">
              Herramientas
            </h3>
            <div class="relative group cursor-pointer" @mouseenter="showSettingsTooltip = true"
              @mouseleave="showSettingsTooltip = false">
              <i
                class="fas fa-cog text-2xl text-gray-500 transform transition-transform duration-300 hover:rotate-180"></i>
              <div v-show="showSettingsTooltip" class="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded 
                    animate-fadeIn">
                Configuración
              </div>
            </div>
          </div>

          <!-- Tools Grid with Stagger Animation -->
          <TransitionGroup name="stagger-fade" tag="div" class="grid grid-cols-2 gap-4" :css="false"
            @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-for="(tool, index) in tools" :key="tool.id" :data-index="index" class="relative group">
              <!-- Tool Button with Hover Effects -->
              <button @click="handleToolClick(tool)" :class="[
                tool.bgColor,
                tool.hoverColor,
                'p-4 rounded-lg w-full transition-all duration-300',
                'flex flex-col items-center justify-center',
                'text-white space-y-2 relative z-10',
                'hover:shadow-lg hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50'
              ]">
                <!-- Icon with Bounce Animation -->
                <font-awesome-icon 
                :icon="tool.icon"
                :class="[
                  'text-2xl transform transition-transform duration-300',
                  'group-hover:scale-110 group-hover:animate-bounce'
                ]"/>

                <!-- Label with Slide Animation -->
                <span class="text-sm font-medium mt-2 transition-all duration-300 
                       group-hover:transform group-hover:translate-y-1">
                  {{ tool.label }}
                </span>

                <!-- Animated Background Gradient -->
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 
                      group-hover:opacity-20 transition-opacity duration-300" :style="{
                        backgroundImage: `linear-gradient(45deg, ${tool.gradientColors.join(', ')})`
                      }"></div>
              </button>

              <!-- Ripple Effect on Click -->
              <div v-if="tool.showRipple" class="ripple absolute" :style="{
                left: `${tool.rippleX}px`,
                top: `${tool.rippleY}px`
              }" @animationend="tool.showRipple = false">
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Resumen y Pago -->
      <div class="flex justify-between items-center border-t pt-4">
        <div class="text-lg font-medium text-gray-600">
          Total: <span class="text-xl font-semibold text-gray-800">${{ total() }}</span>
        </div>
        <button @click="proceedToCheckout"
          class="py-3 px-6 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
          Proceder al Pago
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-400 {
  scrollbar-color: #a0aec0 #edf2f7;
}

.scrollbar-thumb-gray-400::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 10px;
}

.scrollbar-track-gray-200::-webkit-scrollbar-track {
  background-color: #edf2f7;
}


@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}



/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

/* Ripple effect */
.ripple {
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: ripple 0.6s linear;
  transform: scale(0);
}

@keyframes ripple {
  to {
    transform: scale(50);
    opacity: 0;
  }
}

/* Background floating elements */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Bounce animation */
@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-25%);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>