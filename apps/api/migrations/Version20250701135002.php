<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250701135002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE diagnostic_answer_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE diagnostic_answer (id INT NOT NULL, diagnostic_id INT NOT NULL, label VARCHAR(255) NOT NULL, points INT NOT NULL, checked BOOLEAN NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_197A6F3F224CCA91 ON diagnostic_answer (diagnostic_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_answer ADD CONSTRAINT FK_197A6F3F224CCA91 FOREIGN KEY (diagnostic_id) REFERENCES diagnostic (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic ADD score INT DEFAULT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE diagnostic_answer_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_answer DROP CONSTRAINT FK_197A6F3F224CCA91
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE diagnostic_answer
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic DROP score
        SQL);
    }
}
