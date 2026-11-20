# Ticket App

Application Vue 3 pour consulter, filtrer, créer, modifier et supprimer des tickets, avec pagination et interface en français.

## Avec Docker

Avec Docker et Docker Compose installés :

```bash
docker compose up --build -d
```

Ouvrir [http://localhost:8080](http://localhost:8080). Le front et l'API démarrent ensemble ; les requêtes `/api` sont transmises à l'API par Nginx.

Pour arrêter les conteneurs :

```bash
docker compose down
```

## En développement local

Prérequis : Node.js 22.12 ou plus récent, npm et l'API démarrée sur `http://127.0.0.1:1024`.

```bash
npm ci
npm run dev
```

Ouvrir l'URL affichée dans le terminal, généralement [http://localhost:5173](http://localhost:5173). Vite transmet les requêtes `/api` au serveur local.

`npm run build` compile le projet. `npm run preview` permet de prévisualiser le build du front ; utiliser Docker ou le mode développement pour tester avec l'API.
