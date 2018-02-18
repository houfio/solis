<?php
namespace JNL\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;

class CommandProvider extends AbstractServiceProvider
{
    const COMMANDS = [
        'JNL\Command\RunServerCommand',
        'Doctrine\ORM\Tools\Console\Command\SchemaTool\CreateCommand',
        'Doctrine\ORM\Tools\Console\Command\SchemaTool\DropCommand',
        'Doctrine\ORM\Tools\Console\Command\SchemaTool\UpdateCommand',
        'Doctrine\ORM\Tools\Console\Command\GenerateProxiesCommand',
        'Doctrine\ORM\Tools\Console\Command\InfoCommand'
    ];

    public function provides($alias = null)
    {
        return static::COMMANDS;
    }

    public function register()
    {
        foreach (static::COMMANDS as $command) {
            $this->getContainer()->share($command);
        }
    }
}
