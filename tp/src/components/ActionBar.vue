<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const selectedStatus = ref('');

function onSearchInput() {
    // Logique de recherche à implémenter ici
    console.log('Recherche en cours pour :', searchQuery.value);
}

function onStatusChange() {
    // Logique de filtrage par statut à implémenter ici
    console.log('Filtrage par statut :', selectedStatus.value);
}

</script>
<template>
    <div class="action-bar">
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
        <input type="text" placeholder="Rechercher un ticket..." v-model="searchQuery" @input="onSearchInput" />
        <select v-model="selectedStatus" @change="onStatusChange">
            <option value="">Tous les statuts</option>
            <option value="open">Ouvert</option>
            <option value="in_progress">En cours</option>
            <option value="closed">Fermé</option>
        </select>
    </div>
</template>