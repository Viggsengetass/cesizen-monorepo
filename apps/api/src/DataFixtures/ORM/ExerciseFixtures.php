<?php

namespace App\DataFixtures\ORM;

use App\Entity\Exercise;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ExerciseFixtures extends AbstractFixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        /** @var User $user */
        $user = $this->getReference('user_1');

        for ($i = 0; $i < 10; $i++) {
            $exercise = new Exercise();
            $exercise->setName($faker->sentence(3));
            $exercise->setDescription($faker->paragraph);
            $exercise->setDuration($faker->numberBetween(60, 600));
            $exercise->setCreatedAt(new \DateTimeImmutable());
            $exercise->setUpdatedAt(new \DateTimeImmutable());
            $exercise->setUser($user);

            $manager->persist($exercise);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
