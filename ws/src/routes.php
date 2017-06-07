<?php
// Routes

$app -> get( '/stats/dashboard' , \StatsController :: class . ':getStats' );
$app -> post( '/worker/entries' , \WorkerController :: class . ':getList' );
$app -> post( '/worker/best' , \WorkerController :: class . ':getList' );
$app -> post( '/worker' , \WorkerController :: class . ':add' );
$app -> get( '/worker/{id}/token', \WorkerController :: class . ':getToken' );

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
