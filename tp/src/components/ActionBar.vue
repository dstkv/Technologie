<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const selectedStatus = ref('');
const existingSearchDebounce = ref<ReturnType<typeof setTimeout> | null>(null);

const emitFilters = defineEmits<{
    (e: 'update:searchQuery', value: string): void;
    (e: 'update:selectedStatus', value: string): void;
}>();

function performSearch() {
    emitFilters('update:searchQuery', searchQuery.value);
}

function onSearchInput() {
    if (existingSearchDebounce.value) {
        clearTimeout(existingSearchDebounce.value);
    }

    existingSearchDebounce.value = setTimeout(() => {
        performSearch();
    }, 400); // Délai de 400ms pour le debounce
}

function clearSearch() {
    if (existingSearchDebounce.value) {
        clearTimeout(existingSearchDebounce.value);
        existingSearchDebounce.value = null;
    }

    searchQuery.value = '';
    performSearch();
}

function onStatusChange() {
    emitFilters('update:selectedStatus', selectedStatus.value);
}

</script>
<template>
    <div class="action-bar">
        <div class="search-field">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </svg>
            <input type="text" placeholder="Rechercher un ticket..." v-model="searchQuery" @input="onSearchInput" />
            <button v-if="searchQuery" class="clear-search-button" type="button" aria-label="Effacer la recherche"
                @click="clearSearch">
                ×
            </button>
        </div>
        <select v-model="selectedStatus" @change="onStatusChange">
            <option value="">Tous les statuts</option>
            <option value="open">Ouvert</option>
            <option value="in_progress">En cours</option>
            <option value="closed">Fermé</option>
        </select>
        <!-- bouton de création de ticket (rediriger vers /create-tickets)-->
        <router-link to="/create-tickets">
            <button class="create-ticket-button">+</button>
        </router-link>
    </div>
</template>