<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250708130842 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP SEQUENCE diagnostic_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE diagnostic_answer_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE diagnostic_submission_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic DROP CONSTRAINT fk_fa7c8889a76ed395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_answer DROP CONSTRAINT fk_197a6f3f224cca91
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission DROP CONSTRAINT fk_390cd027224cca91
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission DROP CONSTRAINT fk_390cd027a76ed395
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE diagnostic
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE diagnostic_answer
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE diagnostic_submission
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE diagnostic_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE diagnostic_answer_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE diagnostic_submission_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE diagnostic (id INT NOT NULL, user_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, score INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_fa7c8889a76ed395 ON diagnostic (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN diagnostic.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN diagnostic.updated_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE diagnostic_answer (id INT NOT NULL, diagnostic_id INT NOT NULL, label VARCHAR(255) NOT NULL, points INT NOT NULL, checked BOOLEAN NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_197a6f3f224cca91 ON diagnostic_answer (diagnostic_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE diagnostic_submission (id INT NOT NULL, diagnostic_id INT NOT NULL, user_id INT NOT NULL, score INT NOT NULL, submitted_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_390cd027224cca91 ON diagnostic_submission (diagnostic_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_390cd027a76ed395 ON diagnostic_submission (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN diagnostic_submission.submitted_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic ADD CONSTRAINT fk_fa7c8889a76ed395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_answer ADD CONSTRAINT fk_197a6f3f224cca91 FOREIGN KEY (diagnostic_id) REFERENCES diagnostic (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission ADD CONSTRAINT fk_390cd027224cca91 FOREIGN KEY (diagnostic_id) REFERENCES diagnostic (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic_submission ADD CONSTRAINT fk_390cd027a76ed395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }
}
