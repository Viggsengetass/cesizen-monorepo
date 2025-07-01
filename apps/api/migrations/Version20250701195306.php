<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250701195306 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE diagnostic_submission_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE diagnostic_submission (id INT NOT NULL, diagnostic_id INT NOT NULL, user_id INT NOT NULL, answers JSON NOT NULL, score INT NOT NULL, submitted_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_390CD027224CCA91 ON diagnostic_submission (diagnostic_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_390CD027A76ED395 ON diagnostic_submission (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN diagnostic_submission.submitted_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission ADD CONSTRAINT FK_390CD027224CCA91 FOREIGN KEY (diagnostic_id) REFERENCES diagnostic (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission ADD CONSTRAINT FK_390CD027A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE diagnostic_submission_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission DROP CONSTRAINT FK_390CD027224CCA91
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission DROP CONSTRAINT FK_390CD027A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE diagnostic_submission
        SQL);
    }
}
