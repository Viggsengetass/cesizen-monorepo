# CESIZen – Suivi de Développement

## Objectif
Application de gestion du stress et d'informations sur la santé mentale.

## Stack Technique
- **Backend** : Symfony 6, API Platform, PostgreSQL, JWT, Mercure
- **Frontend Web** : Next.js, TailwindCSS, TypeScript
- **Frontend Mobile** : React Native (Expo)
- **Orchestration** : Docker Compose
- **Auth** : JWT avec clé RSA, passphrase `MySuperJwtPass2025!`

## Structure Monorepo
```
apps/
├── api         # Backend Symfony
├── web         # Frontend Web Next.js
├── mobile      # Application mobile (Expo)
```

## Ports
- Symfony API : `localhost:8080`
- PostgreSQL : `localhost:5432`

## Setup Frontend
```bash
cd apps/web
pnpm install
pnpm dev
```

## Setup Backend
```bash
cd apps/api
symfony serve -d
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console hautelook:fixtures:load
```

## Authentification
```bash
POST /api/login_check
{
  "email": "admin@cesizen.local",
  "password": "adminpass"
}
```
