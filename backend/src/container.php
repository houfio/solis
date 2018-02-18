<?php
use JNL\Provider\CommandProvider;
use JNL\Provider\ConfigProvider;
use JNL\Provider\ControllerProvider;
use JNL\Provider\DispatcherProvider;
use JNL\Provider\EntityManagerProvider;
use JNL\Provider\RequestProvider;
use JNL\Provider\ResponseProvider;
use League\Container\Argument\RawArgument;
use League\Container\Container;

$container = new Container();

$container->addServiceProvider(new ConfigProvider());
$container->addServiceProvider(new EntityManagerProvider());
$container->addServiceProvider(new CommandProvider());
$container->addServiceProvider(new RequestProvider());
$container->addServiceProvider(new ResponseProvider());
$container->addServiceProvider(new DispatcherProvider());
$container->addServiceProvider(new ControllerProvider());

$container->inflector('League\Container\ContainerAwareInterface')
    ->invokeMethod('setContainer', [new RawArgument($container)]);

$container->inflector('JNL\Core\Interfaces\EntityManagerAwareInterface')
    ->invokeMethod('setEntityManager', ['entityManager']);

$container->inflector('JNL\Core\Interfaces\RequestAwareInterface')
    ->invokeMethod('setRequest', ['request']);

return $container;
