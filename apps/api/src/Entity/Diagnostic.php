<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DiagnosticRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DiagnosticRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['diagnostic:read']],
    denormalizationContext: ['groups' => ['diagnostic:write']],
    security: "is_granted('ROLE_USER')",
    securityPostDenormalize: "is_granted('ROLE_USER')"
)]
class Diagnostic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['diagnostic:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private ?string $title = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private ?int $score = null;

    #[ORM\Column]
    #[Groups(['diagnostic:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Groups(['diagnostic:read'])]
    private \DateTimeImmutable $updatedAt;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)] // ✅ temporairement nullable pour éviter erreur de migration
    #[Groups(['diagnostic:read'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }
    public function getTitle(): ?string { return $this->title; }
    public function setTitle(string $title): static { $this->title = $title; return $this; }

    public function getDescription(): ?string { return $this->description; }
    public function setDescription(string $description): static { $this->description = $description; return $this; }

    public function getScore(): ?int { return $this->score; }
    public function setScore(?int $score): static { $this->score = $score; return $this; }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): static { $this->createdAt = $createdAt; return $this; }

    public function getUpdatedAt(): \DateTimeImmutable { return $this->updatedAt; }
    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static { $this->updatedAt = $updatedAt; return $this; }

    public function getUser(): ?User { return $this->user; }
    public function setUser(?User $user): static { $this->user = $user; return $this; }
}
