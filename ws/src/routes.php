<?php
// Routes

$app -> get( '/worker/entries' , \WorkerController :: class . ':getList' );
$app -> post( '/worker/entries' , \WorkerController :: class . ':add' );

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
