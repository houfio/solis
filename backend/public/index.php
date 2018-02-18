<?php
use Zend\Diactoros\Response\SapiEmitter;

require __DIR__ . '/../vendor/autoload.php';

$container = require __DIR__ . '/../src/container.php';
$emitter = new SapiEmitter();
$config = $container->get('config');

date_default_timezone_set($config['timezone']);

$emitter->emit($container->get('response'));
