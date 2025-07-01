<?php

namespace App\Entity;

use App\Repository\DiagnosticAnswerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DiagnosticAnswerRepository::class)]
class DiagnosticAnswer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['diagnostic:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private string $label;

    #[ORM\Column]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private int $points;

    #[ORM\Column]
    #[Groups(['diagnostic:read', 'diagnostic:write'])]
    private bool $checked;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Diagnostic $diagnostic = null;

    public function getId(): ?int { return $this->id; }

    public function getLabel(): string { return $this->label; }
    public function setLabel(string $label): static { $this->label = $label; return $this; }

    public function getPoints(): int { return $this->points; }
    public function setPoints(int $points): static { $this->points = $points; return $this; }

    public function isChecked(): bool { return $this->checked; }
    public function setChecked(bool $checked): static { $this->checked = $checked; return $this; }

    public function getDiagnostic(): ?Diagnostic { return $this->diagnostic; }
    public function setDiagnostic(?Diagnostic $diagnostic): static { $this->diagnostic = $diagnostic; return $this; }
}
