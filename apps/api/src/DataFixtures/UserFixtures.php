<?php

namespace App\DataFixtures;

use App\Entity\User;use Doctrine\Bundle\FixturesBundle\Fixture;use Doctrine\Persistence\ObjectManager;use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public function load(ObjectManager $manager): void
    {
        $repo = $manager->getRepository(User::class);

        // Admin
        $admin = $repo->findOneBy(['email' => 'admin@cesizen.local']);
        if (!$admin) {
            $admin = new User();
            $admin->setEmail('admin@cesizen.local');
            $admin->setRoles(['ROLE_ADMIN']);
            $admin->setPassword(
                $this->passwordHasher->hashPassword($admin, 'adminCESIZen123')
            );
            $manager->persist($admin);
        }
        $this->addReference('user_admin', $admin);

        // Utilisateur 1
        $user1 = $repo->findOneBy(['email' => 'user1@cesizen.local']);
        if (!$user1) {
            $user1 = new User();
            $user1->setEmail('user1@cesizen.local');
            $user1->setRoles(['ROLE_USER']);
            $user1->setPassword(
                $this->passwordHasher->hashPassword($user1, 'userOnePass123')
            );
            $manager->persist($user1);
        }
        $this->addReference('user_1', $user1);

        // Utilisateur 2
        $user2 = $repo->findOneBy(['email' => 'user2@cesizen.local']);
        if (!$user2) {
            $user2 = new User();
            $user2->setEmail('user2@cesizen.local');
            $user2->setRoles(['ROLE_USER']);
            $user2->setPassword(
                $this->passwordHasher->hashPassword($user2, 'userTwoPass456')
            );
            $manager->persist($user2);
        }
        $this->addReference('user_2', $user2);

        $manager->flush();
    }
}
