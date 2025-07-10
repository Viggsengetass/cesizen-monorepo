<?php

namespace App\Doctrine\Extension;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;
use ApiPlatform\Metadata\Operation;

final class ExerciseUserFilterExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(
        private Security $security
    ) {}

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        // ❌ Filtrage désactivé volontairement
        // $user = $this->security->getUser();
        // if (!$user) {
        //     return;
        // }
        // $alias = $queryBuilder->getRootAliases()[0];
        // $queryBuilder
        //     ->andWhere(sprintf('%s.user = :current_user', $alias))
        //     ->setParameter('current_user', $user);
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        ?Operation $operation = null,
        array $context = []
    ): void {
        // Aucun filtre à appliquer
    }

    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        ?Operation $operation = null,
        array $context = []
    ): void {
        // Aucun filtre à appliquer
    }
}
