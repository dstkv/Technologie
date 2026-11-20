<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FilterBar from '../components/FilterBar.vue'
import TicketCard from '../components/TicketCard.vue'
import { TicketPage } from '../models/Ticket'
import type { TicketFilters } from '../models/Ticket'
import { errorMessage, getTickets } from '../services/ticketService'

const result = ref(new TicketPage([], false, null))
const page = ref(1)
const loading = ref(false)
const error = ref('')
const filters = ref<TicketFilters>({ title: '', status: '', priority: '' })

async function loadTickets(targetPage = page.value) {
  loading.value = true
  error.value = ''
  try {
    const nextResult = await getTickets(targetPage, filters.value)
    result.value = nextResult
    page.value = targetPage
  } catch (err) {
    error.value = errorMessage(err)
  } finally {
    loading.value = false
  }
}
function search(newFilters: TicketFilters) {
  filters.value = newFilters
  loadTickets(1)
}
onMounted(() => loadTickets())
</script>

<template>
  <div class="page-heading">
    <div>
      <h1>Tickets</h1>
      <p class="muted">Suivi des anomalies du projet</p>
    </div>
    <RouterLink to="/tickets/new" class="button">Nouveau ticket</RouterLink>
  </div>
  <FilterBar :disabled="loading" @search="search" />
  <p v-if="error" class="error" role="alert">{{ error }}</p>
  <p v-if="loading">Chargement des tickets...</p>
  <template v-else>
    <p v-if="result.total !== null" class="muted">
      {{ result.total }} ticket(s) correspondant aux filtres
    </p>
    <p v-if="result.tickets.length === 0" class="panel">Aucun ticket sur cette page.</p>
    <div v-else class="ticket-list">
      <TicketCard v-for="ticket in result.tickets" :key="ticket.id" :ticket="ticket" />
    </div>
  </template>
  <div class="pagination">
    <button class="secondary" :disabled="page === 1 || loading" @click="loadTickets(page - 1)">
      Précédent
    </button>
    <span>Page {{ page }}</span>
    <button class="secondary" :disabled="!result.hasNext || loading" @click="loadTickets(page + 1)">
      Suivant
    </button>
  </div>
</template>
