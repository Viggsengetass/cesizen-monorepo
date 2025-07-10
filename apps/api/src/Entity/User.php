<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Exercise;
use App\Entity\Content;

#[ORM\Entity]
#[ORM\Table(name: "app_user")]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post()
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
    inputFormats: ['json' => ['application/json']],
    outputFormats: ['json' => ['application/json']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: 'L’email est requis.')]
    #[Assert\Email(message: 'Le format de l’email est invalide.')]
    #[Groups(['user:read', 'user:write'])]
    private string $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['user:read', 'user:write'])]
    private array $roles = [];

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank(message: 'Le mot de passe est requis.')]
    #[Assert\Length(min: 12, minMessage: 'Le mot de passe doit contenir au moins {{ limit }} caractères.')]
    #[Groups(['user:write'])]
    private string $password;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Exercise::class, orphanRemoval: true)]
    private Collection $exercises;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Content::class, orphanRemoval: true)]
    private Collection $contents;

    public function __construct()
    {
        $this->exercises = new ArrayCollection();
        $this->contents = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getEmail(): ?string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }
    public function getUserIdentifier(): string { return $this->email; }
    public function getRoles(): array { return array_unique(array_merge($this->roles, ['ROLE_USER'])); }
    public function setRoles(array $roles): self { $this->roles = $roles; return $this; }
    public function getPassword(): string { return $this->password; }
    public function setPassword(string $password): self { $this->password = $password; return $this; }
    public function eraseCredentials(): void {}

    public function getExercises(): Collection { return $this->exercises; }
    public function addExercise(Exercise $exercise): self {
        if (!$this->exercises->contains($exercise)) {
            $this->exercises[] = $exercise;
            $exercise->setUser($this);
        }
        return $this;
    }
    public function removeExercise(Exercise $exercise): self {
        if ($this->exercises->removeElement($exercise) && $exercise->getUser() === $this) {
            $exercise->setUser(null);
        }
        return $this;
    }

    public function getContents(): Collection { return $this->contents; }
    public function addContent(Content $content): self {
        if (!$this->contents->contains($content)) {
            $this->contents[] = $content;
            $content->setUser($this);
        }
        return $this;
    }
    public function removeContent(Content $content): self {
        if ($this->contents->removeElement($content) && $content->getUser() === $this) {
            $content->setUser(null);
        }
        return $this;
    }
}
