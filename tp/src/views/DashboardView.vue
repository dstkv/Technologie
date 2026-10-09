<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ticket, TicketCollection } from '../models/TicketsModel'
import TicketCard from '../components/TicketCard.vue'
import { getTickets } from '../services/TicketsService'
import AppActionBar from '../components/ActionBar.vue'

let tickets: { value: Ticket[] } = ref([]);

function fetchTickets() {
  try {
    getTickets().then((fetchedTickets: TicketCollection) => {
      tickets.value = fetchedTickets.tickets;
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets :', error);
  }
}

onMounted(() => {
  fetchTickets();
});

</script>

<template>
  <div>
    <p>Dashboard</p>
    <p>Visualisation des tickets</p>
    <div v-if="tickets.length === 0">Aucun ticket à afficher ! :(</div>
    <div v-else>
      <section class="action-bar">
        <app-action-bar></app-action-bar>
      </section>
      <div class="ticket-list">
        <section id="ticket-{{ ticket.id }}" v-for="ticket in tickets" :key="ticket.id">
          <ticket-card :ticket="ticket"></ticket-card>
        </section>
      </div>
    </div>
  </div>
</template>
