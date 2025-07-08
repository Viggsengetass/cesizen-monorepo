<?php

namespace App\DataFixtures\ORM;

use App\DataFixtures\UserFixtures;
use App\Entity\Content;
use App\Entity\User;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ContentFixtures extends AbstractFixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        /** @var User $user */
        $user = $this->getReference('user_1', User::class);
        if (!$user instanceof User) {
            throw new \RuntimeException('Reference user_1 is not a User instance.');
        }

        $contents = [
            [
                'title' => 'Respiration profonde : méthode simple pour se détendre',
                'type' => 'article',
                'body' => 'Découvrez comment la respiration abdominale peut aider à réduire le stress en quelques minutes par jour.',
                'coverImage' => 'https://source.unsplash.com/800x400/?meditation,relax',
                'videoUrl' => null,
            ],
            [
                'title' => '5 postures de yoga contre l’anxiété',
                'type' => 'article',
                'body' => 'Le yoga est un allié puissant contre l’anxiété. Voici cinq postures à intégrer dans votre routine quotidienne.',
                'coverImage' => 'https://source.unsplash.com/800x400/?yoga,calm',
                'videoUrl' => null,
            ],
            [
                'title' => 'Visualisation positive guidée',
                'type' => 'video',
                'body' => 'Cette vidéo vous guide à travers un exercice de visualisation positive pour renforcer la confiance en soi.',
                'coverImage' => 'https://source.unsplash.com/800x400/?nature,peaceful',
                'videoUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
            [
                'title' => 'Routine matinale apaisante (infographie)',
                'type' => 'image',
                'body' => 'Suivez cette infographie pour commencer chaque journée avec calme et concentration.',
                'coverImage' => 'https://source.unsplash.com/800x400/?sunrise,morning',
                'videoUrl' => null,
            ],
        ];

        foreach ($contents as $i => $entry) {
            $content = new Content();
            $content->setTitle($entry['title'])
                ->setSlug($this->slugify($entry['title']))
                ->setType($entry['type'])
                ->setBody($entry['body'])
                ->setCreatedAt(new \DateTimeImmutable('-5 days'))
                ->setUpdatedAt(new \DateTimeImmutable('-1 days'))
                ->setCoverImage($entry['coverImage'])
                ->setVideoUrl($entry['videoUrl'])
                ->setMediaUrls([$entry['coverImage']])
                ->setUser($user);

            $manager->persist($content);
            $this->addReference("content_$i", $content);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }

    private function slugify(string $string): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
    }
}
