<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ticket } from '../models/TicketsModel';

let tickets: { value: Ticket[] } = ref([]);

function fetchTickets() {
  // Simuler une requête API pour récupérer les tickets (remplacer par une vraie requête API plus tard)
  tickets.value = [
    {
      id: 1,
      title: 'Problème de connexion',
      description: 'Impossible de se connecter à l\'application.',
      status: 'open',
      priority: 'high',
      created_at: '2024-06-01T10:00:00Z',
      updated_at: '2024-06-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Erreur lors de la soumission du formulaire',
      description: 'Le formulaire renvoie une erreur 500.',
      status: 'in_progress',
      priority: 'medium',
      created_at: '2024-06-02T14:30:00Z',
      updated_at: '2024-06-03T09:15:00Z'
    },
    {
      id: 3,
      title: 'Amélioration de l\'interface utilisateur',
      description: 'Proposer des améliorations pour l\'interface utilisateur.',
      status: 'resolved',
      priority: 'low',
      created_at: '2024-06-03T08:45:00Z',
      updated_at: '2024-06-04T11:20:00Z'
    }
  ];
}

onMounted(() => {
  fetchTickets();
});

</script>

<template>
  <app-header></app-header>
  <div>
    <p>Dashboard</p>
    <p>Visualisation des tickets</p>
    <div v-if="tickets.length === 0">Aucun ticket à afficher ! :(</div>
    <div v-else>
      <section>
        <p>Rechercher ou filtrer les tickets</p>
        <div>
          <!-- Formulaire de recherche et de filtrage des tickets, faire un composant dédié -->
        </div>
      </section>
      <div class="ticket-list">
        <section id="ticket-{{ ticket.id }}" v-for="ticket in tickets" :key="ticket.id">
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description }}</p>
          <p>Status: {{ ticket.status }}</p>
          <p>Priority: {{ ticket.priority }}</p>
          <p>Created at: {{ ticket.created_at }}</p>
          <p>Updated at: {{ ticket.updated_at }}</p>
        </section>
      </div>
    </div>
  </div>
</template>
