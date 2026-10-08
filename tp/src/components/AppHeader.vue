<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="app-header"><div class="container header-content">
    <RouterLink to="/" class="brand">Mini Bug-Tracker</RouterLink>
    <nav><RouterLink to="/">Tickets</RouterLink><RouterLink to="/tickets/new">Créer un ticket</RouterLink></nav>
  </div></header>
</template>
