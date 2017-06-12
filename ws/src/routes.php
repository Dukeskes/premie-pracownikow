<?php
// Routes

$app -> get( '/stats/dashboard' , \StatsController :: class . ':getStats' );

$app -> post( '/worker/entries' , \WorkerController :: class . ':getList' );
$app -> post( '/worker/best' , \WorkerController :: class . ':getList' );
$app -> post( '/worker' , \WorkerController :: class . ':add' );
$app -> put( '/worker' , \WorkerController :: class . ':update' );
$app -> get( '/worker/{id}', \WorkerController :: class . ':getById' );
$app -> get( '/worker/{id}/token', \WorkerController :: class . ':getToken' );

$app -> get( '/worker/{workerId}/review' , \ReviewController :: class . ':review' );

$app -> post( '/auth/logIn', \WorkerController :: class . ':auth' );

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
