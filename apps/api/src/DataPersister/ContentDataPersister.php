<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Content;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class ContentDataPersister implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $inner,
        private Security $security
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof Content) {
            $user = $this->security->getUser();
            $data->setUser($user);
            $data->setCreatedAt(new \DateTimeImmutable());
            $data->setUpdatedAt(new \DateTimeImmutable());
        }

        return $this->inner->process($data, $operation, $uriVariables, $context);
    }

    public function remove(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        return $this->inner->remove($data, $operation, $uriVariables, $context);
    }
}
