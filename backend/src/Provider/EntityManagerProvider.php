<?php
namespace JNL\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;

class EntityManagerProvider extends AbstractServiceProvider
{
    protected $provides = [
        'entityManager'
    ];

    public function register()
    {
        $this->getContainer()->share('entityManager', function () {
            $config = $this->getContainer()->get('config');

            return EntityManager::create(
                [
                    'driver' => 'pdo_pgsql',
                    'host' => $config['database_host'],
                    'dbname' => $config['database_name'],
                    'user' => $config['database_user'],
                    'password' => $config['database_password'],
                    'charset' => 'utf8'
                ],
                Setup::createAnnotationMetadataConfiguration(
                    ['src'],
                    $config['debug'] ?? false,
                    null,
                    null,
                    false
                )
            );
        });
    }
}
