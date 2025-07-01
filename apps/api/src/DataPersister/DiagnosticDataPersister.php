<?php

namespace App\DataPersister;

use ApiPlatform\Doctrine\Orm\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Diagnostic;
use Symfony\Bundle\SecurityBundle\Security;

class DiagnosticDataPersister implements ProcessorInterface
{
    public function __construct(
        private readonly ProcessorInterface $persistProcessor,
        private readonly Security $security
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof Diagnostic) {
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        $now = new \DateTimeImmutable();
        $data->setUpdatedAt($now);

        if (null === $data->getCreatedAt()) {
            $data->setCreatedAt($now);
        }

        if (null === $data->getUser()) {
            $data->setUser($this->security->getUser());
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
