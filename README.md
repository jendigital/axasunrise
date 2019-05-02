Projet AXA
===========

Développement React/Redux au sujet d'une refonte d'un client lourd (Java)

Sunrise
=======

Plateforme avec une liste de modele de calcul. Chaque modele est rattaché à diagramme éditable. 
Les fonctions de calcul de certains éléments du diagramme sont eux même détaillées
dans éditeur de code. Par ailleurs, la configuration automatique de calcul massif est possible.

Des droits sont appliqués sur chaque fonctionnalité du logiciel (droiit de lecture, d'édition, de suppression)

Documentation et screenshot disponible sur ce lien
===================================================
    
https://docs.google.com/document/d/1ZV3xe-UfkM_0OVicJzW_NkGqv4YVFda1KMdcaS004-I/edit?usp=sharing

Equipe Front-end (Jennifer LIM - contact@jendigitalvision.com)
==============================================================

L'équipe allant s'agrandir, il est important en tant que Lead Front de documenter la partie technique pour que mes collaborateurs sur le projet
puisse être au courant des choix que j'ai effectué, des résultats de mes recherches et développement et des diverses POC effectués. 
Diverses Readme seront placés sur diverses parties de l'arborescence du projet pour expliquer ma démarche. Libre à vous collaborateur de rajouter ou modifier des éléments de ce readme et donc la manière de travaillé mais avant tenez au courant l'équipe car on peut concurrentiellement travailler sur des parties communes.

* Un système de pull request et de validation de merge devra se mettre en place, j'étais seule mais il est important que l'on applique cette méthodolie quand on est plusieur à évoluer sur le projet.
* Chaque branche devra commencer par SUN-Numéro du ticket - La structure globale ainsi que la plupart des librairie que j'ai choisi suite aux différents POC que j'ai réalisé sont implémenté sur la branche d'origine sunriseV1.0. Mais dès que de nouveaux développeurs rejoignent l'équipe, 
nous mettrons en place des rituels agiles tels que des réunions rapides je vous assure, un chiffrage, des bilans ainsi qu'un planning.

Un Trello Sunrise a été mis en place pour définir et suivre les tâches du projet.
https://trello.com/b/vN7gK1qj/sunrise-frontjs

Nécessaire pour que le front fonctionne
========================================

Bien lire la doc du Backend disponible dans le readme de la branche la plus avancée (en ce moment nextVesion-newEnv mais touujours la confirmer avec l'équipe backend alias Yann Lemoigne - ylemoigne@javatic.fr ou via sunrise-axa.slack.com, Yann à les droits)

Pour savoir comment installer le backend qui diffuse les API en local et postgres SQL (base de donnée - en demander le dump au backend) 

## Functionnalities

### Framework

* React JS https://reactjs.org/pour la nomenclature du projet
* React dom https://www.npmjs.com/package/react-dom pour la gestion des routes
* Redux https://redux.js.org/ - React-Redux https://github.com/reduxjs/react-redux pour les appels API sous le pattern flux avec Redux-thunk https://github.com/reduxjs/redux-thunk 
* L’authentification avec Redux-logger https://github.com/LogRocket/redux-logger - token jwt dans le local storage https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage

### Create React App (Webpacking clean solution)

Base du projet Create-React-App https://github.com/facebook/create-react-app de facebook qui a un script de lancement React-scripts (Encapsulation de Webpack lancant React avec gestion dev/prod qui marche avec un lancement de multiple script grâce à npm-run-all https://www.npmjs.com/package/npm-run-all

### Style fait sous SASS/Css https://sass-lang.com/  

Interprété par le lazy loading grâce au script node-sass-chokidar https://www.npmjs.com/package/node-sass-chokidar (recursivité de la transformation des fichiers sass en fichier css)

### Javascript natif avec ES6 http://es6-features.org/#Constants - standard moderne d’ecriture

Embarqué de base dans un projet react, Babel https://babeljs.io/ est la solution utiliser pour transpiler ES6 en javascript

### Fetch Solution simple choisi pour les appels API avec un Authorization Bearer Token

https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

### React-bootstrap https://react-bootstrap.github.io/components/table/ pour tableau 

Etablir des tableaux propres avec du custom design - Css propre au thème sunrise

### Code Editor

Monaco Editor https://microsoft.github.io/monaco-editor/ pour l’IDE en ligne (vscode en ligne 

### Diagram

Joint JS https://www.jointjs.com/ pour les diagrammes

### React-modal https://github.com/reactjs/react-modal 

pour les diverses modals

### Webdav http://www.webdav.org/ https://www.npmjs.com/package/webdav 

pour accéder au serveurs local de fichier de config

### React-awesome-tabs https://gao-sun.github.io/react-awesome-tabs/ lib pour la gestion des onglets 

Avec une manipulation du local storage (retrouver ce qui a été ouvert à la dernière session 

## Heroku App, click on the link to see the result on preproduction

https://sunriseaxa.herokuapp.com/ (Not available for the moment, as backend is not online)

## Launch React Front

* cd react-ui && yarn start
* see result on http://localhost:3000
* cd react-ui && yarn test to launch jest test
* create-react-app-sass project

## Launch Server (Optionnal on localhost Indispensable for Heroku)

* cd .. && yarn start
* see result on http://localhost:5000

## Project Purpose

* Refonte of a heavy software with creation of a web app from scratch
https://trello.com/b/vN7gK1qj

## Test with hard written object

## Result with fetch

## Deploy on Heroku from Root (Preproduction plateforme https://sunriseaxa.herokuapp.com/)

* Install the Heroku CLI
* Download and install the Heroku CLI.

## If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
* Create a new Git repository
* Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a sunriseaxa

* Deploy your application
* Commit your code to the repository and deploy it to Heroku using Git.
$ git add .
$ git commit -am "make it better"
$ git push heroku master
OR
$ git push heroku branchname:master

* Existing Git repository
* For existing repositories, simply add the heroku remote
$ heroku git:remote -a sunriseaxa
