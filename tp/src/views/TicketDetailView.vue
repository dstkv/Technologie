<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { priorityLabels, statusLabels } from '../models/Ticket'
import type { Ticket, UpdateTicketDTO } from '../models/Ticket'
import { deleteTicket, errorMessage, getTicket, updateTicket } from '../services/ticketService'

const route = useRoute()
const router = useRouter()
const ticket = ref<Ticket | null>(null)
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const success = ref('')
const form = reactive<UpdateTicketDTO>({ status: 'open', priority: 'medium' })

async function loadTicket() {
  loading.value = true
  error.value = ''
  success.value = ''
  ticket.value = null
  try {
    const result = await getTicket(String(route.params.id))
    ticket.value = result
    form.status = result.status
    form.priority = result.priority
  } catch (err) {
    error.value = errorMessage(err)
  } finally {
    loading.value = false
  }
}
async function save() {
  if (!ticket.value) return
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    const id = ticket.value.id
    await updateTicket(id, { ...form })
    const updated = await getTicket(id)
    ticket.value = updated
    form.status = updated.status
    form.priority = updated.priority
    success.value = 'Le ticket a été mis à jour.'
  } catch (err) {
    error.value = errorMessage(err)
  } finally {
    saving.value = false
  }
}
async function remove() {
  if (!ticket.value) return
  if (!window.confirm(`Supprimer le ticket "${ticket.value.title}" ?`)) return
  deleting.value = true
  error.value = ''
  success.value = ''
  try {
    await deleteTicket(ticket.value.id)
    await router.push('/')
  } catch (err) {
    error.value = errorMessage(err)
  } finally {
    deleting.value = false
  }
}
function formatDate(value: string | null): string {
  if (!value) return 'Non renseignée'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('fr-FR')
}
watch(() => route.params.id, loadTicket, { immediate: true })
</script>

<template>
  <RouterLink to="/" class="back-link">← Retour aux tickets</RouterLink>
  <p v-if="loading">Chargement du ticket...</p>
  <p v-if="error" class="error" role="alert">{{ error }}</p>
  <p v-if="success" class="success" role="status">{{ success }}</p>
  <template v-if="ticket && !loading">
    <div class="page-heading">
      <h1>{{ ticket.title }}</h1>
      <span class="badge" :class="`priority-${ticket.priority}`">{{ priorityLabels[ticket.priority] }}</span>
    </div>
    <section class="panel">
      <h2>Description</h2>
      <p class="description">{{ ticket.description }}</p>
      <dl class="details">
        <dt>Identifiant</dt><dd>{{ ticket.id }}</dd>
        <dt>Statut</dt><dd>{{ statusLabels[ticket.status] }}</dd>
        <dt>Priorité</dt><dd>{{ priorityLabels[ticket.priority] }}</dd>
        <dt>Création</dt><dd>{{ formatDate(ticket.createdAt) }}</dd>
        <dt>Dernière modification</dt><dd>{{ formatDate(ticket.updatedAt) }}</dd>
      </dl>
    </section>
    <form class="panel form-layout" @submit.prevent="save">
      <h2>Modifier le ticket</h2>
      <label>
        Statut
        <select v-model="form.status" :disabled="saving || deleting">
          <option value="open">Ouvert</option>
          <option value="in_progress">En cours</option>
          <option value="resolved">Résolu</option>
        </select>
      </label>
      <label>
        Priorité
        <select v-model="form.priority" :disabled="saving || deleting">
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </label>
      <div class="actions">
        <button type="submit" :disabled="saving || deleting">{{ saving ? 'Enregistrement...' : 'Enregistrer' }}</button>
        <button type="button" class="danger" :disabled="saving || deleting" @click="remove">
          {{ deleting ? 'Suppression...' : 'Supprimer le ticket' }}
        </button>
      </div>
    </form>
  </template>
</template>
