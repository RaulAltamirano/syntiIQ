<script lang="ts" src="./DefaultLayout.ts"/>

<template>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
        <RouterView/>
      </main>
    </div>
  </template>
  