<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\DiagnosticSubmission;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * DataPersister spécifique aux DiagnosticSubmission :
 * - Injecte le User connecté
 * - Transforme les réponses (DTO ou tableau brut)
 * - Calcule le score automatiquement
 */
class DiagnosticSubmissionDataPersister implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,
        private Security $security
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof DiagnosticSubmission) {
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        $user = $this->security->getUser();
        if (!$user) {
            throw new \LogicException('Aucun utilisateur authentifié');
        }
        $data->setUser($user);

        // 1. Transformation des réponses vers tableau brut
        $rawAnswers = array_map(function ($answer) {
            if (is_array($answer)) {
                return [
                    'label' => $answer['label'] ?? '',
                    'points' => (int)($answer['points'] ?? 0),
                    'checked' => (bool)($answer['checked'] ?? false),
                ];
            }

            return [
                'label' => $answer->label ?? '',
                'points' => (int)($answer->points ?? 0),
                'checked' => (bool)($answer->checked ?? false),
            ];
        }, $data->getAnswers());

        $data->setAnswers($rawAnswers);

        // 2. Calcul du score
        $score = array_reduce($rawAnswers, function ($sum, $answer) {
            return $sum + ($answer['checked'] ? $answer['points'] : 0);
        }, 0);

        $data->setScore($score);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

    public function remove(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        return $this->persistProcessor->remove($data, $operation, $uriVariables, $context);
    }
}
