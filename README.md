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

Assurez-vous d'être sur le même réseau entre le PC qui fait tourner le conteneur Docker et le téléphone qui va utiliser l'application mobile.  

Ouvrez un terminal PowerShell à la racine du projet puis tapez les commandes suivantes :  
```bash
cd .\apps\mobile\
npm install
cp .env.exemple .env
```
Ouvrez un terminal cmd et tapez :
```bash
ipconfig
```
Remplacez "localhost" dans le fichier *apps/mobile/.env* par l'adresse IP trouvée dans la partie **Carte réseau sans fil Wi-Fi**, puis dans la section **Adresse IPv4**.

Retournez dans le premier terminal et tapez :
```bash
npm run start
```
Scannez avec le téléphone le QR code apparu et accédez à l'application.

## Lancer l'Auth service
Commande pour lancer l'Auth Service

```bash
cd .\apps\auth-service-JWT\

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
