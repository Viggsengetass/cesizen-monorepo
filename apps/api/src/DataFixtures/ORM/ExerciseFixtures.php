<?php

namespace App\DataFixtures\ORM;

use App\Entity\Exercise;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ExerciseFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        foreach (range(1, 10) as $i) {
            $exercise = new Exercise();
            $exercise->setName("Exercice $i");
            $exercise->setDescription("Description de l’exercice $i");
            $exercise->setCreatedAt(new \DateTimeImmutable());
            $exercise->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($exercise);
        }

        $manager->flush();
    }
}
