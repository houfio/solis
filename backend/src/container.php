<?php
use JNL\Core\Interfaces\ContainerAwareInterface;
use JNL\Core\Interfaces\EntityManagerAwareInterface;
use JNL\Core\Interfaces\RequestAwareInterface;
use JNL\Provider\CommandProvider;
use JNL\Provider\ConfigProvider;
use JNL\Provider\ControllerProvider;
use JNL\Provider\DispatcherProvider;
use JNL\Provider\EntityManagerProvider;
use JNL\Provider\RequestProvider;
use JNL\Provider\ResponseProvider;
use JNL\Provider\TransformerProvider;
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
$container->addServiceProvider(new TransformerProvider());

$container->inflector(ContainerAwareInterface::class)
    ->invokeMethod('setContainer', [new RawArgument($container)]);

$container->inflector(EntityManagerAwareInterface::class)
    ->invokeMethod('setEntityManager', ['entityManager']);

$container->inflector(RequestAwareInterface::class)
    ->invokeMethod('setRequest', ['request']);

return $container;
