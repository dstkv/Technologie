<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { CreateTicketDTO } from '../models/Ticket'
import { createTicket, errorMessage } from '../services/ticketService'

const router = useRouter()
const saving = ref(false)
const error = ref('')
const form = reactive<CreateTicketDTO>({ title: '', description: '', priority: 'medium' })

async function submit() {
  error.value = ''
  const title = form.title.trim()
  const description = form.description.trim()
  if (title.length < 3 || title.length > 255) {
    error.value = 'Le titre doit contenir entre 3 et 255 caractères.'
    return
  }
  if (description.length < 15) {
    error.value = 'La description doit contenir au moins 15 caractères.'
    return
  }
  saving.value = true
  try {
    await createTicket({ title, description, priority: form.priority })
    await router.push('/')
  } catch (err) {
    error.value = errorMessage(err)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <h1>Nouveau ticket</h1>
  <form class="panel form-layout" @submit.prevent="submit">
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <label>
      Titre
      <input v-model="form.title" required minlength="3" maxlength="255" :disabled="saving" />
    </label>
    <label>
      Description
      <textarea v-model="form.description" required minlength="15" rows="7" :disabled="saving"></textarea>
    </label>
    <label>
      Priorité
      <select v-model="form.priority" required :disabled="saving">
        <option value="low">Faible</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </select>
    </label>
    <div class="actions">
      <button type="submit" :disabled="saving">{{ saving ? 'Création...' : 'Créer le ticket' }}</button>
      <RouterLink to="/" class="button secondary">Annuler</RouterLink>
    </div>
  </form>
</template>
