<script setup lang="ts">
import type { Ticket } from '../models/TicketsModel';
defineProps<{
    ticket: Ticket;
}>();
</script>

<template>
    <div class="ticket-card">
        <h3>{{ ticket.title }}</h3>
        <p>{{ ticket.description }}</p>
        <p :class="`ticket-status ticket-status-${ticket.status}`">Statut : {{ ticket.status }}</p>
        <p :class="`ticket-priority ticket-priority-${ticket.priority}`">Priorité : {{ ticket.priority }}</p>
        <p>Créé le : {{ ticket.createdAt }}</p>
    </div>
</template>