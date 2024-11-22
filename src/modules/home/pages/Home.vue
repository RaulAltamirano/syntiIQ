<script lang="ts" src="./Home.ts"/>


<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
      <!-- Título -->
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center my-6">
        Bienvenido al Dashboard de SyntiIQ
      </h1>
  
      <!-- Tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <!-- Tarjeta: Caja -->
        <div
          @click="navigate('/caja')"
          class="card group bg-white hover:bg-blue-100"
        >
          <div class="icon bg-blue-500">
            <font-awesome-icon icon="cash-register" />

          </div>
          <h2 class="title group-hover:text-blue-500">Caja</h2>
          <p class="description">
            Administra tus ventas y flujo de caja de manera eficiente.
          </p>
        </div>
  
        <!-- Tarjeta: Usuarios -->
        <div
          @click="navigate('/usuarios')"
          class="card group bg-white hover:bg-green-100"
        >
          <div class="icon bg-green-500">
            <font-awesome-icon icon="users" />
          </div>
          <h2 class="title group-hover:text-green-500">Usuarios</h2>
          <p class="description">
            Gestiona usuarios, roles y accesos a la plataforma.
          </p>
        </div>
  
        <!-- Tarjeta: Productos -->
        <div
          @click="navigate('Products')"
          class="card group bg-white hover:bg-red-100"
        >
          <div class="icon bg-red-500">
            <font-awesome-icon icon="box-open" />

          </div>
          <h2 class="title group-hover:text-red-500">Productos</h2>
          <p class="description">
            Organiza y controla tu catálogo de productos.
          </p>
        </div>
  
        <!-- Tarjeta: Inventarios -->
        <div
          @click="navigate('/inventarios')"
          class="card group bg-white hover:bg-yellow-100"
        >
          <div class="icon bg-yellow-500">
            <font-awesome-icon icon="warehouse" />
                    </div>
          <h2 class="title group-hover:text-yellow-500">Inventarios</h2>
          <p class="description">
            Revisa y actualiza el stock de tus inventarios.
          </p>
        </div>
  
        <!-- Tarjeta: Pedidos -->
        <div
          @click="navigate('/analisis')"
          class="card group bg-white hover:bg-purple-100"
        >
          <div class="icon bg-purple-500">
            <font-awesome-icon icon="chart-bar" />
                    </div>
          <h2 class="title group-hover:text-purple-500">Análisis</h2>
          <p class="description">
            Visualiza estadísticas y reportes de pedidos.
          </p>
        </div>

         <!-- Tarjeta: Pedidos -->
         <div
          @click="navigate('/pedidos')"
          class="card group bg-white hover:bg-purple-100"
        >
          <div class="icon bg-orange-500">
            <font-awesome-icon icon="box" />
                    </div>
          <h2 class="title group-hover:text-purple-500">Pedidos</h2>
          <p class="description">
            Visualiza estadísticas y reportes de pedidos.
          </p>
        </div>
  
  
        <!-- Tarjeta: Configuraciones -->
        <div
          @click="navigate('/configuraciones')"
          class="card group bg-white hover:bg-gray-200"
        >
          <div class="icon bg-gray-500">
            <font-awesome-icon icon="cogs" />

          </div>
          <h2 class="title group-hover:text-gray-500">Configuraciones</h2>
          <p class="description">
            Ajusta opciones avanzadas y personaliza tu sistema.
          </p>
        </div>
      </div>
    </div>
  </template>
  

  
  <style>
  .card {
    cursor: pointer;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: white;
    transition: background-color 0.3s, transform 0.3s;
  }
  .group:hover .icon {
    transform: scale(1.1);
  }
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    transition: color 0.3s;
  }
  .description {
    font-size: 0.875rem;
    text-align: center;
    color: #4b5563;
    margin-top: 0.5rem;
  }
  </style>
  