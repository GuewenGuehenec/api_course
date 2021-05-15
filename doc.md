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