<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsCommand(
    name: 'test:mail',
    description: 'Envoie un email de test via Mailer (check MailDev).',
)]
class TestMailCommand extends Command
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        parent::__construct();
        $this->mailer = $mailer;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (new Email())
            ->from('cesizen@no-reply.local')
            ->to('test@cesizen.local')
            ->subject('Test MailDev')
            ->text('Ceci est un test de l\'envoi d\'email via Symfony Mailer et MailDev.');

        $this->mailer->send($email);

        $output->writeln('<info>Email de test envoyé avec succès !</info>');

        return Command::SUCCESS;
    }
}
