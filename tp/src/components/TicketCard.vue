<script setup lang="ts">
import type { Ticket } from '../models/TicketsModel';
import { ref } from 'vue';

defineProps<{
    ticket: Ticket;
}>();

const showDetails = ref(false);

</script>

<template>
    <div class="ticket-card">
        <dev>
            <h3>{{ ticket.title }}</h3>
            <p v-if="showDetails">{{ ticket.description }}</p>
            <p :class="`ticket-status ticket-status-${ticket.status}`">Statut : {{ ticket.status }}</p>
            <p :class="`ticket-priority ticket-priority-${ticket.priority}`">Priorité : {{ ticket.priority }}</p>
            <p v-if="showDetails">Créé le : {{ ticket.createdAt }}</p>
        </dev>
        <button @click="showDetails = !showDetails">
            {{ showDetails ? 'Masquer les détails' : 'Afficher les détails' }}
        </button>
    </div>
</template>