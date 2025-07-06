<?php

namespace App\DataPersister;

use ApiPlatform\Doctrine\Orm\ItemDataPersister;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class UserOwnedDataPersister implements ProcessorInterface
{
    private ProcessorInterface $inner;
    private Security $security;

    public function __construct(ProcessorInterface $inner, Security $security)
    {
        $this->inner = $inner;
        $this->security = $security;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $user = $this->security->getUser();

        if (method_exists($data, 'setUser') && $user !== null) {
            $data->setUser($user);
        }

        return $this->inner->process($data, $operation, $uriVariables, $context);
    }
}
