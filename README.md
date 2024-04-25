# Projet Final 3w Academy - PAJS02

## Site communautaire de recherches universitaires cinématographiques

### Installation

#### Back

ouvrir le terminal et accéder au dossier `server`

`cd your_path/server`

installer les `node_modules`

`npm i`

Créez une base de données MongoDB et récupérer l'URI pour la connection pour le point suivant

créer un dossier `.env` puis renseignez chaque variable

``` 
PORT = VOTRE_PORT
BASE_URL = VOTRE_URL
MONGO_URL = VOTRE_BASE_DE_DONNEE_MONGO
JWT_SECRET = VOTRE_CODE_SECRET
JWT_EXPIRATION = LA_DUREE_CHOISIE_DE_VOTRE_TOKEN
``` 

demarrer le serveur

`npm start`

##### API ENDPOINTS

###### UTILISATEURS

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/users/register | enregistrer un nouvel utilisateur |
| POST | /api/users/login | se connecter |
| GET | /api/users/ | voir tous les utilisateurs |
| GET | /api/users/:id | voir un seul utilisateur |
| PUT | /api/users/edit/:id | modifier les informations de l'utilisateur |
| DELETE | /api/users/delete/:id | supprimer l'utilisateur |

###### ARTICLES

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/articles/new | créer un nouvel article |
| GET | /api/articles/ | voir tous les articles |
| GET | /api/articles/:id | voir un seul article |
| PUT | /api/articles/edit/:id | modifier un article |
| DELETE | /api/articles/delete/:id | supprimer un article |

###### ARTICLES : LIKES & FAVORIS

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/articles/addlike/:id | ajouter un like |
| DELETE | /api/articles/deletelike/:id | supprimer un like |
| POST | /api/articles/addfavorite/:id | ajouter en favori |
| DELETE | /api/articles/deletefavorite/:id | supprimer le favori |

###### COMMENTAIRES

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/comments/new/:articleId | créer un nouvel article |
| GET | /api/comments/:articleId| voir tous les articles |

##### FORMATS DE REQUÊTES

###### POST REGISTER

- Sans image : urlencoded
- Avec image: form-data

```
firstname,
lastname,
email,
imageProfile, (facultatif)
password (min 8 caractères, 1 majuscule, 1 minuscule, 1 caractèrespécial, 1 chiffre)
```

###### POST LOGIN

```
email,
password 
```

###### POST NEW ARTICLE

- Sans image : urlencoded
- Avec image: form-data

```
title,
summary,
content,
imageUrl, (facultatif)
```

###### POST NEW COMMENT

```
content,
articleId
```

##### FORMATS DE REQUÊTES

Réponse en JSON

#### Front

ouvrir le terminal et accéder au dossier `client`

`cd your_path/client`

installer les `node_modules`

`npm i`

demarrer le serveur

`npm run dev`

### Fonctionnement de l'API

Description des schemas...
Et test de connexion sur terminal linux
