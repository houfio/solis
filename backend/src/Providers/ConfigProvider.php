<?php
namespace JNL\Providers;

use League\Container\ServiceProvider\AbstractServiceProvider;

class ConfigProvider extends AbstractServiceProvider
{
    protected $provides = [
        'config'
    ];

    public function register()
    {
        $this->getContainer()->share('config', function () {
            $config = [
                'debug' => false,
                'database_host' => '127.0.0.1',
                'database_name' => 'jnl',
                'prefix' => '/api',
                'timezone' => 'Europe/Amsterdam'
            ];
            $local_config_path = __DIR__ . '/../../local_config.php';

            if (file_exists($local_config_path)) {
                $config = array_merge($config, require $local_config_path);
            }

            return $config;
        });
    }
}
