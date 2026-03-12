# Echoo

Une application musicale communautaire innovante permettant d'écouter de la musique et de la partager avec ses amis !

## Installation du projet
### Docker

> Note : Il est nécessaire d'installer les dépendances localement pour que cela fonctionne.


Pour lancer les conteneurs Docker: 

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

> Note: Il faut tout de même lancer l'application mobile à la main.

### API

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/api
```

Puis, installez les dépendances :
```bash
composer install
```

Enfin créez le fichier `.env` à partir du fichier `.env.exemple`

### Application mobile

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

> Note: le compte de test pour se connecter avec Docker est le suivant:
> - email: admin@admin.com
> - mot de passe: Admin123!
---
**Si jamais vous rencontrez une erreur à la première connexion, attendez quelques secondes et recommencez, il faut patienter pour l'initialisation complète de tous les conteneurs**

Dans l'application, nous vous conseillions de faire vos tests avec l'artiste Billie Eilish, sa discographie est au complet.

### API authentification

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/auth-service-JWT
```

Puis, installez les dépendances :
```bash
npm install
```

Créez le fichier `.env` à partir du fichier `.env.exemple`

Pour mettre en place la base de données, lancez les commandes suivantes:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db push 
```

Vous pouvez lancer l'API avec la commande suivante:

```bash
npm run dev

```

### Web authentification  

Dirigez-vous dans le dossier de l'API:
```bash
cd .\apps\web-service-authentification\
```

Puis, installez les dépendances :
```bash
npm install
```

Enfin créez le fichier `.env` à partir du fichier `.env.exemple`

Vous pouvez lancer l'application avec la commande suivante :
```bash
npm run dev
```

## Tests
### API

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/api
```

Puis, lancez les tests :
```bash
composer test
```

Pour lancer les tests de performances simples, lancez :
```bash
composer perf_test
```

Pour lancer les tests de performances complets, lancez :
```bash
composer full_perf_test
```

Pour lancer le linter, lancez:
```bash
composer lint
```

### Application mobile

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/mobile
```

Pour lancer le linter, lancez:
```bash
npm run lint
```

### API authentification

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/auth-service-JWT
```

Pour lancer le linter, lancez:
```bash
npm run lint
```

### Web authentification

Dirigez-vous dans le dossier de l'API:
```bash
cd apps/web-service-authentification
```

Pour lancer le linter, lancez:
```bash
npm run lint
```

## Auteurs

- TISSIER Elouan (Eloups)
- SCHEER Corentin (CRT15)
- DURAND Romain (Sonyoss)
- CALLERAND Thibault (TitiLeGrand)
