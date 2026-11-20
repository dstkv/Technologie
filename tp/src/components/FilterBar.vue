<script setup lang="ts">
import { reactive } from 'vue'
import type { TicketFilters } from '../models/Ticket'
defineProps<{ disabled: boolean }>()
const emit = defineEmits<{ search: [filters: TicketFilters] }>()
const filters = reactive<TicketFilters>({ title: '', status: '', priority: '' })
function search() { emit('search', { ...filters }) }
function reset() {
  filters.title = ''; filters.status = ''; filters.priority = ''; search()
}
</script>
<template>
  <form class="panel filters" @submit.prevent="search">
    <label>
      Titre
      <input v-model="filters.title" type="search" placeholder="Rechercher un ticket..." />
    </label>
    <label>
      Statut
      <select v-model="filters.status">
        <option value="">Tous</option>
        <option value="open">Ouvert</option>
        <option value="in_progress">En cours</option>
        <option value="resolved">Résolu</option>
      </select>
    </label>
    <label>
      Priorité
      <select v-model="filters.priority">
        <option value="">Toutes</option>
        <option value="low">Faible</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </select>
    </label>
    <button type="submit" :disabled="disabled">Rechercher</button>
    <button type="button" class="secondary" :disabled="disabled" @click="reset">Réinitialiser</button>
  </form>
</template>
