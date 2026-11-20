<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="app-header">
    <div class="container header-content">
      <RouterLink to="/" class="brand">
        <img src="/Logo.png" alt="INSA Hauts-de-France" class="brand-logo" width="116" height="70" />
        <span>Mini Bug-Tracker</span>
      </RouterLink>
      <nav>
        <RouterLink to="/">Tickets</RouterLink>
        <RouterLink to="/tickets/new">Créer un ticket</RouterLink>
      </nav>
    </div>
  </header>
</template>
