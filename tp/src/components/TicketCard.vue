<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { priorityLabels, statusLabels } from '../models/Ticket'
import type { Ticket } from '../models/Ticket'
defineProps<{ ticket: Ticket }>()
</script>
<template>
  <article class="panel ticket-card">
    <div class="ticket-heading">
      <h2><RouterLink :to="{ name: 'ticket-detail', params: { id: ticket.id } }">{{ ticket.title }}</RouterLink></h2>
      <span class="badge" :class="`priority-${ticket.priority}`">{{ priorityLabels[ticket.priority] }}</span>
    </div>
    <p class="preview">{{ ticket.description }}</p>
    <div class="ticket-footer"><span>{{ statusLabels[ticket.status] }}</span><span>#{{ ticket.id }}</span></div>
  </article>
</template>
