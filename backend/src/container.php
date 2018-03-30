<?php
use Solis\Core\Interfaces\ContainerAwareInterface;
use Solis\Core\Interfaces\EntityManagerAwareInterface;
use Solis\Core\Interfaces\RequestAwareInterface;
use Solis\Core\Interfaces\TransformerAwareInterface;
use Solis\Providers\CommandProvider;
use Solis\Providers\ConfigProvider;
use Solis\Providers\ControllerProvider;
use Solis\Providers\DispatcherProvider;
use Solis\Providers\EntityManagerProvider;
use Solis\Providers\RequestProvider;
use Solis\Providers\ResponseProvider;
use Solis\Providers\TransformerProvider;
use League\Container\Argument\RawArgument;
use League\Container\Container;

$container = new Container();

$container->addServiceProvider(ConfigProvider::class);
$container->addServiceProvider(EntityManagerProvider::class);
$container->addServiceProvider(CommandProvider::class);
$container->addServiceProvider(RequestProvider::class);
$container->addServiceProvider(ResponseProvider::class);
$container->addServiceProvider(DispatcherProvider::class);
$container->addServiceProvider(ControllerProvider::class);
$container->addServiceProvider(TransformerProvider::class);

$container->inflector(ContainerAwareInterface::class)
    ->invokeMethod('setContainer', [new RawArgument($container)]);

$container->inflector(EntityManagerAwareInterface::class)
    ->invokeMethod('setEntityManager', ['entityManager']);

$container->inflector(RequestAwareInterface::class)
    ->invokeMethod('setRequest', ['request']);

$container->inflector(TransformerAwareInterface::class)
    ->invokeMethod('setTransformer', ['transformer']);

return $container;
