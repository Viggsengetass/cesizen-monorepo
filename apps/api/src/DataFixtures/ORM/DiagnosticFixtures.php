<?php

namespace App\DataFixtures\ORM;

use App\Entity\Diagnostic;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DiagnosticFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        foreach (range(1, 5) as $i) {
            $diagnostic = new Diagnostic();
            $diagnostic->setTitle("Diagnostic $i");
            $diagnostic->setDescription("Description du diagnostic $i");
            $diagnostic->setCreatedAt(new \DateTimeImmutable());
            $diagnostic->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($diagnostic);

            if ($i === 1) {
                $this->addReference('diagnostic_1', $diagnostic); // utilisé dans DiagnosticSubmissionFixtures
            }
        }

        $manager->flush();
    }
}
