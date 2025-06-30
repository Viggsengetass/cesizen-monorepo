<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250630143333 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP title
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP media_url
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP duration
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise RENAME COLUMN type TO name
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD title VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD media_url VARCHAR(255) DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD duration INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise RENAME COLUMN name TO type
        SQL);
    }
}
