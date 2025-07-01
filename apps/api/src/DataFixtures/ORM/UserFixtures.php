<?php

namespace App\DataFixtures\ORM;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@cesizen.local');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword(
            $this->passwordHasher->hashPassword($user, 'adminpass')
        );

        $manager->persist($user);
        $manager->flush();

        // Références pour d'autres fixtures
        $this->addReference('user_admin', $user);
        $this->addReference('user_1', $user); // pour les diagnostics ou autres entités liées à un user
    }
}
