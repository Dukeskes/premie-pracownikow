<?php
// DIC configuration

require_once( __dir__ . "/../class/Worker.php" );
require_once( __dir__ . "/../class/Review.php" );

require_once( __dir__ . "/../controllers/WorkerController.php" );
require_once( __dir__ . "/../controllers/ReviewController.php" );
require_once( __dir__ . "/../controllers/StatsController.php" );

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['db'] = function ($container) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($container['settings']['db']);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    return $capsule;
};

$container[ WorkerController :: class ] = function ($c) {

    $logger = $c -> get('logger');
    $table = $c -> get('db') -> table('workers');

    return new \WorkerController($logger, $table);

};

$container[ ReviewController :: class ] = function ($c) {

    $logger = $c -> get('logger');
    $table = $c -> get('db') -> table('reviews');

    return new \ReviewController($logger, $table);

};

$container[ StatsController :: class ] = function ($c) {

    $logger = $c -> get('logger');
    $table = $c -> get('db') -> table('stats');

    return new \StatsController($logger, $table);

};