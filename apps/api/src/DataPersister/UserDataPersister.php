<?php
declare(strict_types=1);

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * Persiste les entités User :
 * - Hash automatiquement le plainPassword avant sauvegarde
 * - Assigne ROLE_USER par défaut si aucun rôle défini
 * - Délègue ensuite la persistance au processor standard (Doctrine)
 */
final class UserDataPersister implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,          // Processor par défaut (Doctrine, etc.)
        private UserPasswordHasherInterface $passwordHasher    // Service de hash de mot de passe
    ) {}

    /**
     * Persistance (POST/PUT/PATCH).
     * - Hash le mot de passe si plainPassword présent
     * - Définit un rôle par défaut si vide
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof User) {
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        if ($data->getPlainPassword()) {
            $hashed = $this->passwordHasher->hashPassword($data, $data->getPlainPassword());
            $data->setPassword($hashed);
        }

        if (empty($data->getRoles())) {
            $data->setRoles(['ROLE_USER']);
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

    /**
     * Suppression (DELETE) → déléguée au processor par défaut
     */
    public function remove(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        return $this->persistProcessor->remove($data, $operation, $uriVariables, $context);
    }
}
