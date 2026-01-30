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
npm run start
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

## Lancement des tests de l'application

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/api
```

Puis, lancez les tests :
```bash
composer test
```

## Auteurs

- TISSIER Elouan (Eloups)
- SCHEER Corentin (CRT15)
- DURAND Romain (Sonyoss)
- CALLERAND Thibault (TitiLeGrand)
