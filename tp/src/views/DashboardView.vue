<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ticket } from '../models/TicketsModel';

let tickets: { value: Ticket[] } = ref([]);

function fetchTickets() {
  // Simuler une requête API pour récupérer les tickets (remplacer par une vraie requête API plus tard)
  tickets.value = [
    { id: 1, title: 'Ticket 1', description: 'Description du ticket 1', status: 'open', created_at: '2024-01-01', updated_at: '2024-01-02' },
    { id: 2, title: 'Ticket 2', description: 'Description du ticket 2', status: 'in_progress', created_at: '2024-01-03', updated_at: '2024-01-04' },
    { id: 3, title: 'Ticket 3', description: 'Description du ticket 3', status: 'closed', created_at: '2024-01-05', updated_at: '2024-01-06' },
  ];
}

onMounted(() => {
  fetchTickets();
});

</script>

<template>
  <div>Dashboard</div>
  <p>Visualisation des tickets</p>
  <div v-if="tickets.length === 0">Aucun ticket à afficher ! :(</div>
  <div v-else>
    <section>
      <p>Rechercher ou filtrer les tickets</p>
      <div>
        <!-- Formulaire de recherche et de filtrage des tickets, faire un composant dédié -->
      </div>
    </section>
    <div>
      <section v-for="ticket in tickets" :key="ticket.id">
        <h3>{{ ticket.title }}</h3>
        <p>{{ ticket.description }}</p>
        <p>Statut: {{ ticket.status }}</p>
        <p>Créé le: {{ ticket.created_at }}</p>
        <p>Mis à jour le: {{ ticket.updated_at }}</p>
      </section>
    </div>
  </div>
</template>
