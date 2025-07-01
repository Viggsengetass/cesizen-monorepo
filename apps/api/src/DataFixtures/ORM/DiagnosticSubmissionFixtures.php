<?php

namespace App\DataFixtures\ORM;

use App\Entity\Diagnostic;
use App\Entity\DiagnosticSubmission;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class DiagnosticSubmissionFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 5; $i++) {
            $submission = new DiagnosticSubmission();

            $answers = [];
            $score = 0;

            for ($j = 0; $j < 3; $j++) {
                $checked = $faker->boolean;
                $points = $faker->numberBetween(1, 5);
                $answers[] = [
                    'label' => $faker->word(),
                    'points' => $points,
                    'checked' => $checked,
                ];
                if ($checked) $score += $points;
            }

            $submission->setAnswers($answers);
            $submission->setScore($score);

            // 🔥 Correction ici : getReference avec 2 paramètres
            $submission->setDiagnostic($this->getReference('diagnostic_1', Diagnostic::class));
            $submission->setUser($this->getReference('user_admin', User::class));

            $manager->persist($submission);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            DiagnosticFixtures::class,
        ];
    }
}
