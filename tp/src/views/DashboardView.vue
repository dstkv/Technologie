<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ticket, TicketCollection, TicketRequest, TicketStatus } from '../models/TicketsModel'
import TicketCard from '../components/TicketCard.vue'
import { getTickets } from '../services/TicketsService'
import AppActionBar from '../components/ActionBar.vue'

const tickets = ref<Ticket[]>([])
const currentTicketFilter = ref<TicketRequest>({
  page: 1,
  title: '',
  status: undefined,
  priority: undefined,
  createdAfter: undefined,
  createdBefore: undefined,
})

function fetchTickets() {
  getTickets(currentTicketFilter.value)
    .then((fetchedTickets: TicketCollection) => {
      tickets.value = fetchedTickets.tickets
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des tickets :', error)
    })
}

function handleSearchQueryUpdate(searchQuery: string) {
  currentTicketFilter.value.title = searchQuery.trim()
  currentTicketFilter.value.page = 1
  fetchTickets()
}

function handleSelectedStatusUpdate(selectedStatus: string) {
  currentTicketFilter.value.status = selectedStatus === '' ? undefined : (selectedStatus as TicketStatus)
  currentTicketFilter.value.page = 1
  fetchTickets()
}

onMounted(() => {
  fetchTickets()
})
</script>

<template>
  <div>
    <p>Dashboard</p>
    <p>Visualisation des tickets</p>
    <section class="action-bar">
      <app-action-bar @update:searchQuery="handleSearchQueryUpdate"
        @update:selectedStatus="handleSelectedStatusUpdate"></app-action-bar>
    </section>
    <div v-if="tickets.length === 0">Aucun ticket à afficher ! :(</div>
    <div v-else>
      <div class="ticket-list">
        <section id="ticket-{{ ticket.id }}" v-for="ticket in tickets" :key="ticket.id">
          <ticket-card :ticket="ticket"></ticket-card>
        </section>
      </div>
    </div>
  </div>
</template>
