<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\EmotionEntry;
use Symfony\Bundle\SecurityBundle\Security;

class EmotionEntryDataPersister implements ProcessorInterface
{
    public function __construct(
        private readonly ProcessorInterface $inner,
        private readonly Security $security
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof EmotionEntry && null === $data->getUser()) {
            $data->setUser($this->security->getUser());
        }

        return $this->inner->process($data, $operation, $uriVariables, $context);
    }

    public function remove(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        return $this->inner->remove($data, $operation, $uriVariables, $context);
    }
}
