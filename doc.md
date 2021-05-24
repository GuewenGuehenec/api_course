## Création du projet symfony

```bash
composer create-project symfony/website-skeleton api-course
```

## Création d'une entité

```bash
composer create-project symfony/website-skeleton api-course
```

## Création d'une migration

```bash
php bin/console make:migration
```

## Migration d'une migration vers la BDD
```bash
php bin/console doctrine:migrations:migrate
```


## Mise en place du composant de fixtures
```bash
composer require orm-fixtures fzaninotto/faker --dev
```

## Executer les fixtures
```bash
php bin/console doctrine:fixtures:load --no-interaction
```

## Mise en place de la gestion des utilisateurs

```bash
php bin/console make:user
```

## Mise en place d'API Platform

```bash
composer require api
```

## Installation du WebPack-encore

```bash
composer require encore
```

## Installation des dépendances

```bash
npm install @babel/preset-react@^7.0.0 --save-dev
npm install react@16.8.6
npm install react@16.8.6 react-dom@16.8.6 react-router-dom@5.0.0 axios@0.18.0
npm install moment
```