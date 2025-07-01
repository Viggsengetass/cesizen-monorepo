<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Dto\DiagnosticAnswer;
use App\Repository\DiagnosticSubmissionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Type;

#[ORM\Entity(repositoryClass: DiagnosticSubmissionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['diagnostic_submission:read']],
    denormalizationContext: ['groups' => ['diagnostic_submission:write']],
    security: "is_granted('ROLE_USER')",
)]
class DiagnosticSubmission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['diagnostic_submission:read'])]
    private ?int $id = null;

    #[Groups(['diagnostic_submission:read', 'diagnostic_submission:write'])]
    #[Type('array<App\Dto\DiagnosticAnswer>')]
    private array $answers = [];

    #[ORM\Column]
    #[Groups(['diagnostic_submission:read'])]
    private int $score = 0;

    #[ORM\Column]
    #[Groups(['diagnostic_submission:read'])]
    private \DateTimeImmutable $submittedAt;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['diagnostic_submission:read', 'diagnostic_submission:write'])]
    private ?Diagnostic $diagnostic = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['diagnostic_submission:read'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->submittedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }

    public function getAnswers(): array { return $this->answers; }
    public function setAnswers(array $answers): static { $this->answers = $answers; return $this; }

    public function getScore(): int { return $this->score; }
    public function setScore(int $score): static { $this->score = $score; return $this; }

    public function getSubmittedAt(): \DateTimeImmutable { return $this->submittedAt; }
    public function setSubmittedAt(\DateTimeImmutable $submittedAt): static { $this->submittedAt = $submittedAt; return $this; }

    public function getDiagnostic(): ?Diagnostic { return $this->diagnostic; }
    public function setDiagnostic(?Diagnostic $diagnostic): static { $this->diagnostic = $diagnostic; return $this; }

    public function getUser(): ?User { return $this->user; }
    public function setUser(?User $user): static { $this->user = $user; return $this; }
}
