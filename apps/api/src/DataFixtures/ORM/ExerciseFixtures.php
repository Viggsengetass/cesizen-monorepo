<?php

namespace App\DataFixtures\ORM;

use App\Entity\Exercise;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ExerciseFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        /** @var User $user */
        $user = $this->getReference('user_1', User::class);

        $exercises = [
            [
                'name' => 'Cohérence cardiaque 365',
                'description' => 'Exercice simple : 6 respirations par minute pendant 5 minutes. Inspirer 5s, expirer 5s.',
                'duration' => 300,
                'imageUrl' => 'https://source.unsplash.com/800x400/?calm,breath',
                'audioUrl' => 'https://example.com/audio/breathe1.mp3',
            ],
            [
                'name' => 'Respiration abdominale guidée',
                'description' => 'Respirez profondément dans le ventre pour détendre le système nerveux.',
                'duration' => 180,
                'imageUrl' => 'https://source.unsplash.com/800x400/?relaxation,breathing',
                'audioUrl' => 'https://example.com/audio/breathe2.mp3',
            ],
            [
                'name' => 'Pause zen 3 minutes',
                'description' => 'Une courte pause pour vous recentrer avec une respiration consciente.',
                'duration' => 180,
                'imageUrl' => 'https://source.unsplash.com/800x400/?nature,peace',
                'audioUrl' => null,
            ],
            [
                'name' => 'Respiration carrée',
                'description' => 'Inspirez 4s, bloquez 4s, expirez 4s, bloquez 4s. Cycle apaisant et structurant.',
                'duration' => 240,
                'imageUrl' => 'https://source.unsplash.com/800x400/?focus,breathe',
                'audioUrl' => 'https://example.com/audio/breathe3.mp3',
            ],
            [
                'name' => 'Respiration alternée (Nadi Shodhana)',
                'description' => 'Technique de respiration indienne pour équilibrer les énergies.',
                'duration' => 300,
                'imageUrl' => 'https://source.unsplash.com/800x400/?meditation,yoga',
                'audioUrl' => null,
            ],
            [
                'name' => 'Scan corporel respiratoire',
                'description' => 'Respirez en déplaçant votre attention dans chaque zone du corps.',
                'duration' => 420,
                'imageUrl' => 'https://source.unsplash.com/800x400/?body,relax',
                'audioUrl' => 'https://example.com/audio/breathe4.mp3',
            ],
        ];

        foreach ($exercises as $data) {
            $exercise = new Exercise();
            $exercise->setName($data['name'])
                ->setDescription($data['description'])
                ->setDuration($data['duration'])
                ->setCreatedAt(new \DateTimeImmutable('-5 days'))
                ->setUpdatedAt(new \DateTimeImmutable('-1 days'))
                ->setUser($user);

            if ($data['imageUrl']) {
                $exercise->setImageUrl($data['imageUrl']);
            }
            if ($data['audioUrl']) {
                $exercise->setAudioUrl($data['audioUrl']);
            }

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
