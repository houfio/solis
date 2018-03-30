<?php
namespace Solis\Providers;

use Doctrine\ORM\Tools\Console\Command\GenerateProxiesCommand;
use Doctrine\ORM\Tools\Console\Command\InfoCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\CreateCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\DropCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\UpdateCommand;
use Doctrine\ORM\Tools\Console\Command\ValidateSchemaCommand;
use Solis\Commands\RunServerCommand;
use League\Container\ServiceProvider\AbstractServiceProvider;

class CommandProvider extends AbstractServiceProvider
{
    const COMMANDS = [
        RunServerCommand::class,
        CreateCommand::class,
        DropCommand::class,
        UpdateCommand::class,
        GenerateProxiesCommand::class,
        InfoCommand::class,
        ValidateSchemaCommand::class
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
