<?php
namespace JNL\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class RunServerCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('server:run')
            ->addOption('address', 'a', InputOption::VALUE_REQUIRED, 'Set the address for the web server to run on', '127.0.0.1')
            ->addOption('port', 'p', InputOption::VALUE_REQUIRED, 'Set the port for the web server to run on', 8000)
            ->setDescription('Run a local web server');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $host = $input->getOption('address') . ':' . $input->getOption('port');
        $docRoot = __DIR__ . '/../../public';
        $output->writeln('Server running on http://' . $host);

        exec("php -S $host -t " . $docRoot);

        return null;
    }
}
