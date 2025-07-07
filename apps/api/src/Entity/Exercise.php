<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ExerciseRepository;

#[ORM\Entity(repositoryClass: ExerciseRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('ROLE_USER')"),
        new Get(security: "is_granted('ROLE_USER') and object.getUser() == user"),
        new Post(securityPostDenormalize: "object.getUser() == user"),
    ],
    normalizationContext: ['groups' => ['exercise:read']],
    denormalizationContext: ['groups' => ['exercise:write']],
)]
class Exercise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['exercise:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['exercise:read', 'exercise:write'])]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['exercise:read', 'exercise:write'])]
    #[Assert\NotBlank]
    private ?string $description = null;

    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['exercise:read', 'exercise:write'])]
    private int $duration = 300;

    #[ORM\Column]
    #[Groups(['exercise:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Groups(['exercise:read'])]
    private \DateTimeImmutable $updatedAt;

    #[ORM\ManyToOne(inversedBy: 'exercises')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['exercise:read'])]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['exercise:read', 'exercise:write'])]
    private ?string $imageUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['exercise:read', 'exercise:write'])]
    private ?string $audioUrl = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }
    public function getName(): ?string { return $this->name; }
    public function setName(string $name): static { $this->name = $name; return $this; }

    public function getDescription(): ?string { return $this->description; }
    public function setDescription(string $description): static { $this->description = $description; return $this; }

    public function getDuration(): int { return $this->duration; }
    public function setDuration(int $duration): static { $this->duration = $duration; return $this; }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): static { $this->createdAt = $createdAt; return $this; }

    public function getUpdatedAt(): \DateTimeImmutable { return $this->updatedAt; }
    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static { $this->updatedAt = $updatedAt; return $this; }

    public function getUser(): ?User { return $this->user; }
    public function setUser(?User $user): static { $this->user = $user; return $this; }

    public function getImageUrl(): ?string { return $this->imageUrl; }
    public function setImageUrl(?string $imageUrl): static { $this->imageUrl = $imageUrl; return $this; }

    public function getAudioUrl(): ?string { return $this->audioUrl; }
    public function setAudioUrl(?string $audioUrl): static { $this->audioUrl = $audioUrl; return $this; }
}
