<script lang="ts" src="./SocialAuth.ts"/>

<template>
  <div class="social-auth">
    <button @click="handleGoogleAuth" class="social-btn google">
      <img src="../../../../assets//google-logo.svg" alt="Google Icon" class="icon" />
      Google
    </button>
    <button @click="handleGithubAuth" class="social-btn github">
      <img src="../../../../assets/github-logo.svg" alt="GitHub Icon" class="icon" />
      GitHub
    </button>
  </div>
</template>

<style scoped src="./SocialAuth.css"/>