import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import CreateTicketView from '../views/CreateTicketView.vue'
import TicketDetailView from '../views/TicketDetailView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/tickets/new', name: 'ticket-create', component: CreateTicketView },
    { path: '/tickets/:id', name: 'ticket-detail', component: TicketDetailView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
