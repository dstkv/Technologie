# Ticket App

Application Vue 3 pour gérer des tickets de projet : consulter, filtrer, créer, modifier et supprimer des tickets.

## Fonctionnalités

- Liste des tickets avec pagination
- Filtres par titre, statut et priorité
- Création d'un nouveau ticket
- Consultation et modification détaillée d'un ticket
- Suppression d'un ticket
- Interface simple en français

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

Puis ouvrez l'URL affichée dans le terminal, généralement :

```text
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev     # démarre le serveur de développement
npm run build   # compile le projet pour la production
npm run preview # prévisualise le build
```

## Notes

Cette application consomme une API sur le chemin `/api` pour les opérations sur les tickets. Assurez-vous que le backend correspondant est bien démarré avant de tester l'application.

## Structure du projet

```text
src/
  components/   # composants réutilisables
  views/        # pages de l'application
  services/     # appel API
  models/       # types et modèles
  router/       # configuration des routes
```
