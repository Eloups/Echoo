# Echoo

Une application musicale communautaire innovante permettant d'écouter de la musique et de la partager avec ses amis !

## Installation du projet d'API

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/api
```

Puis, installez les dépendances :
```bash
composer install
```

## Lancer l'application mobile 

Commande pour lancer l'application mobile avec Expo go

```bash
cd .\apps\mobile\
npm install
npm run start
```


## Lancer l'Auth service
Commande pour lancer l'Auth Service

```bash
bunx prisma generate
bunx prisma migrate dev
bunx prisma db push 
bun run dev

npx prisma generate
npx prisma migrate dev
npx prisma db push 
npm run dev
```

Pour voir les donnée de la bdd : 
```bash
bunx prisma studio

npx prisma studio
```

## Lancement de conteneurs docker

Note : Vous avez besoin de générer le fichier vendor localement avant de lancer les conteneurs Docker.\
Commande pour lancer les conteneurs :

```bash
docker-compose up -d
```

Commande pour éteindre les conteneurs :

```bash
docker-compose stop
```

Commande pour supprimer les conteneurs :

```bash
docker-compose down -v
```

## Auteurs

- TISSIER Elouan (Eloups)
- SCHEER Corentin (CRT15)
- DURAND Romain (Sonyoss)
- CALLERAND Thibault (TitiLeGrand)
