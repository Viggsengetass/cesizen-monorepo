<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmotionEntryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmotionEntryRepository::class)]
#[ApiResource]
class EmotionEntry
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $emotionType = null;

    #[ORM\Column]
    private ?int $intensity = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $note = null;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\ManyToOne]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmotionType(): ?string
    {
        return $this->emotionType;
    }

    public function setEmotionType(string $emotionType): static
    {
        $this->emotionType = $emotionType;
        return $this;
    }

    public function getIntensity(): ?int
    {
        return $this->intensity;
    }

    public function setIntensity(int $intensity): static
    {
        $this->intensity = $intensity;
        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): static
    {
        $this->note = $note;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }
}
