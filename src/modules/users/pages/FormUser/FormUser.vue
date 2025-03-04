<script lang="ts" src="./FormUser.ts" />

<template>
  <div class="flex justify-center items-center min-h-screen transition-colors duration-300">

    <div class="flex flex-col p-6 max-w-6xl w-full space-y-6 relative rounded-xl " :class="[
      isDark
        ? 'bg-gray-900/40 text-white'
        : 'bg-white/80 text-gray-800 shadow-lg'
    ]"> <!-- Header -->
      <TitleCard title="New user" icon="user-plus" :actions="[
        { icon: 'eye', click: togglePreview },
        { icon: 'cog', click: openSettings },
        // { icon: 'chart-bar', click: showReports }
      ]" />


      <!-- Form -->
      <!-- Profile Type Selection -->
      <Motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 0.5 }">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div v-for="profile in profileTypes" :key="profile.id"
            class="relative p-6 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            :class="[
              selectedProfile?.id === profile.id ? 'ring-2 ring-blue-500' : 'bg-white dark:bg-gray-800',
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            ]" @click="selectProfile(profile)">
            <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-4', profile.color]">
              <FontAwesomeIcon :icon="profile.icon" class="text-white" />
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ profile.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ profile.description }}</p>
          </div>
        </div>
      </Motion>

      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="user.name" type="text" class="w-full p-2 rounded-lg border transition-colors"
            :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Email</label>
          <input v-model="user.email" type="email" class="w-full p-2 rounded-lg border transition-colors"
            :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
        </div>
      </div>

      <!-- Dynamic Form -->
      <Motion v-if="selectedProfile" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
        :transition="{ duration: 0.5, delay: 0.2 }">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Basic Information -->

          <!-- Encabezado -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Delivery Locations</h3>
            <button @click="addNewLocation"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
              <FontAwesomeIcon icon="plus" />

            </button>
          </div>

          <div v-if="user.locations.length > 0" class="space-y-4">
            <div v-for="(location, index) in user.locations" :key="index" ref="cardMotion"
              class="rounded-lg p-4 relative bg-white dark:bg-gray-800 hover:border-blue-500 transition-all hover:scale-[1.02] shadow-sm">

              <!-- Nombre y Establecer por Defecto -->
              <div class="flex justify-between items-start">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2">
                    <input v-model="location.name" type="text" placeholder="Location name (e.g. Home, Work)"
                      class="text-lg font-medium bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full" />
                    <span v-if="location.isDefault"
                      class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-900 rounded-full flex items-center gap-1">
                      <FontAwesomeIcon icon="star" /> Default
                    </span>
                  </div>
                  <!-- Dirección -->
                  <textarea v-model="location.address" placeholder="Full address"
                    class="w-full p-2 rounded-lg  resize-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    rows="2"></textarea>
                  <input v-model="location.reference" type="text" placeholder="Reference (optional)"
                    class="w-full p-2 rounded-lg  bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
                </div>
              </div>

              <!-- Botones de Acción -->
              <div class="flex justify-end gap-2 mt-4">
                <button v-if="!location.isDefault" @click="setDefaultLocation(index)"
                  class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                  <FontAwesomeIcon icon="star" /> Set Default
                </button>
                <button @click="removeLocation(index)"
                  class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <FontAwesomeIcon icon="trash" /> Remove
                </button>
              </div>

              <!-- Mapa / Selector -->
              <div v-if="location.coordinates"
                class="mt-4 h-40 bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden border border-gray-200 dark:border-gray-600">
                <img
                  :src="`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.JvDUdKbds5u-QGJLdyhxaAHaDe%26pid%3DApi&f=1&ipt=a61849e041cab2189cf6c9c16d9c1d700905f057ff9d127094991481cb37263e&ipo=images`"
                  alt="Map preview" class="w-full h-full object-cover rounded-lg" />
                <button @click="openMapPicker(index)"
                  class="absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  <Edit class="w-4 h-4" /> Update location
                </button>
              </div>
              <button v-else @click="openMapPicker(index)"
                class="mt-4 w-full p-4 border-2 border-dashed rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400 transition-colors flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700">
                <MapPin class="w-5 h-5" /> Click to set location on map
              </button>
            </div>
          </div>

          <!-- Estado Vacío -->
          <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No locations added yet</p>
            <p class="text-sm">You can add your first delivery location now or do it later</p>
          </div>

          <!-- Role Specific Fields -->
          <Motion v-if="selectedProfile.id === 'delivery'" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
            :transition="{ duration: 0.5, delay: 0.3 }">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Vehicle Type</label>
                  <select v-model="user.delivery.vehicleType" class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']">
                    <option value="">Select vehicle type</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium">License Plate</label>
                  <input v-model="user.delivery.licensePlate" type="text"
                    class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium">Preferred Zones</label>
                <select v-model="user.delivery.preferredZones" multiple
                  class="w-full p-2 rounded-lg border transition-colors"
                  :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']">
                  <option value="north">North Zone</option>
                  <option value="south">South Zone</option>
                  <option value="east">East Zone</option>
                  <option value="west">West Zone</option>
                </select>
              </div>
            </div>
          </Motion>

          <!-- Cashier Specific Fields -->
          <Motion v-if="selectedProfile.id === 'cashier'" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
            :transition="{ duration: 0.5, delay: 0.3 }">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Branch Office</label>
                  <select v-model="user.cashier.branchOffice" class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']">
                    <option value="">Select branch</option>
                    <option v-for="store in stores" :key="store" :value="store">
                      {{ store }}
                    </option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Cashier Number</label>
                  <input v-model="user.cashier.cashierNumber" type="text"
                    class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Shift Start Time</label>
                  <input v-model="user.cashier.shiftStartTime" type="time"
                    class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Shift End Time</label>
                  <input v-model="user.cashier.shiftEndTime" type="time"
                    class="w-full p-2 rounded-lg border transition-colors"
                    :class="[isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300']" />
                </div>
              </div>
            </div>
          </Motion>

          <!-- Submit Button -->
          <Motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.4 }">
            <div class="flex justify-end gap-3 pt-6">
              <button type="button" class="px-4 py-2 rounded-lg transition-colors"
                :class="[isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200']"
                @click="$router.back()">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                :disabled="loading">
                {{ loading ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </Motion>
        </form>
      </Motion>
    </div>
  </div>
</template>
