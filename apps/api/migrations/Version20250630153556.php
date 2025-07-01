<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250630153556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic ADD user_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic ADD CONSTRAINT FK_FA7C8889A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_FA7C8889A76ED395 ON diagnostic (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD user_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51CA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_AEDAD51CA76ED395 ON exercise (user_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic DROP CONSTRAINT FK_FA7C8889A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_FA7C8889A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE diagnostic DROP user_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP CONSTRAINT FK_AEDAD51CA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_AEDAD51CA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP user_id
        SQL);
    }
}
