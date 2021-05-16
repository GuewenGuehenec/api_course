<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private Security $security;

    private AuthorizationCheckerInterface $checker;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->checker = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        // Obtenir l'utilisateur connecté
        $user = $this->security->getUser();

        // Si on demande des invoices ou des customers alors, agir sur la requête pour qu'elle tienne compte de l'utilisateur connecté
        if (
            ($resourceClass === Customer::class || $resourceClass === Invoice::class)
            &&
            !$this->checker->isGranted('ROLE_ADMIN')
            &&
            $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if ($resourceClass === Customer::class) {
                $queryBuilder->andWhere("$rootAlias.utilisateur = :user");
            } elseif ($resourceClass === Invoice::class) {
                $queryBuilder->join("$rootAlias.customer", "c")
                    ->andWhere("c.utilisateur = :user ");
            }
            $queryBuilder->setParameter("user", $user);
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

}