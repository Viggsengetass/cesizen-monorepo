<?php

namespace App\DataFixtures\ORM;

use App\Entity\EmotionEntry;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EmotionEntryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        foreach (range(1, 10) as $i) {
            $entry = new EmotionEntry();
            $entry->setEmotionType("joy");
            $entry->setIntensity(rand(1, 10));
            $entry->setNote("Note $i"); // ✅ corrigé ici (remplace setComment)
            $entry->setCreatedAt(new \DateTimeImmutable());

            $manager->persist($entry);
        }

        $manager->flush();
    }
}
