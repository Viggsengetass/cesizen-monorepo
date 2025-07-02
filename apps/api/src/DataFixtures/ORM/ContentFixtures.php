<?php

namespace App\DataFixtures\ORM;

use App\Entity\Content;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ContentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 10; $i++) {
            $createdAt = \DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-30 days', '-2 days')
            );

            $updatedAt = \DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-1 days', 'now')
            );

            $content = new Content();
            $content->setTitle($faker->sentence())
                ->setSlug($faker->slug())
                ->setType($faker->randomElement(['article', 'video', 'image']))
                ->setBody($faker->paragraph(5))
                ->setCreatedAt($createdAt)
                ->setUpdatedAt($updatedAt)
                ->setCoverImage($faker->imageUrl())
                ->setVideoUrl($faker->url())
                ->setMediaUrls([
                    $faker->url(),
                    $faker->url(),
                    $faker->url()
                ]);

            $manager->persist($content);
        }

        $manager->flush();
    }
}
