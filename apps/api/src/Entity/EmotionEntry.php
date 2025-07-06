<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmotionEntryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EmotionEntryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['emotion:read']],
    denormalizationContext: ['groups' => ['emotion:write']],
    security: "is_granted('ROLE_USER')",
    securityPostDenormalize: "object.getUser() === null or (object.getUser() !== null and object.getUser() === user)"
)]
class EmotionEntry
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['emotion:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['emotion:read', 'emotion:write'])]
    #[Assert\NotBlank]
    private ?string $emotion = null;

    #[ORM\Column]
    #[Groups(['emotion:read', 'emotion:write'])]
    #[Assert\NotNull]
    private ?int $intensity = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['emotion:read', 'emotion:write'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['emotion:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(inversedBy: 'emotionEntries')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['emotion:read'])] // Ne pas exposer à l’écriture
    private ?User $user = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }

    public function getEmotion(): ?string { return $this->emotion; }
    public function setEmotion(string $emotion): static { $this->emotion = $emotion; return $this; }

    public function getIntensity(): ?int { return $this->intensity; }
    public function setIntensity(int $intensity): static { $this->intensity = $intensity; return $this; }

    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $description): static { $this->description = $description; return $this; }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): static { $this->createdAt = $createdAt; return $this; }

    public function getUser(): ?User { return $this->user; }
    public function setUser(?User $user): static { $this->user = $user; return $this; }
}
