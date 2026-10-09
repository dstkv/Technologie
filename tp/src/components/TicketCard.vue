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
        <p :class="`ticket-status ticket-status-${ticket.status}`">Status: {{ ticket.status }}</p>
        <p :class="`ticket-priority ticket-priority-${ticket.priority}`">Priority: {{ ticket.priority }}</p>
        <p>Created at: {{ ticket.created_at }}</p>
        <p>Updated at: {{ ticket.updated_at }}</p>
    </div>
</template>