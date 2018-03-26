<?php
use JNL\Core\Interfaces\ContainerAwareInterface;
use JNL\Core\Interfaces\EntityManagerAwareInterface;
use JNL\Core\Interfaces\RequestAwareInterface;
use JNL\Providers\CommandProvider;
use JNL\Providers\ConfigProvider;
use JNL\Providers\ControllerProvider;
use JNL\Providers\DispatcherProvider;
use JNL\Providers\EntityManagerProvider;
use JNL\Providers\RequestProvider;
use JNL\Providers\ResponseProvider;
use JNL\Providers\TransformerProvider;
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

return $container;
