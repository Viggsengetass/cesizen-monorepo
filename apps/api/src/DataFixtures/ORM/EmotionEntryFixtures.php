<?php

namespace App\DataFixtures\ORM;

use App\Entity\EmotionEntry;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;

class EmotionEntryFixtures extends AbstractFixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        /** @var User $user */
        $user = $this->getReference('user_admin');

        foreach (range(1, 10) as $i) {
            $entry = new EmotionEntry();
            $entry->setEmotionType('joy');
            $entry->setIntensity(rand(1, 10));
            $entry->setNote("Note $i");
            $entry->setCreatedAt(new \DateTimeImmutable());
            $entry->setUser($user);

            $manager->persist($entry);
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
