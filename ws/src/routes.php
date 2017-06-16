<?php
// Routes

$app -> get( '/stats/dashboard' , \StatsController :: class . ':getStats' );

$app -> post( '/worker/entries' , \WorkerController :: class . ':getList' );
$app -> post( '/worker/best' , \WorkerController :: class . ':getBest' );
$app -> post( '/worker' , \WorkerController :: class . ':add' );
$app -> put( '/worker' , \WorkerController :: class . ':update' );
$app -> get( '/worker/{id}', \WorkerController :: class . ':getById' );
$app -> delete( '/worker/{id}', \WorkerController :: class . ':removeById' );
$app -> get( '/worker/{id}/token', \WorkerController :: class . ':getToken' );
$app -> get( '/worker/byToken/{token}' , \WorkerController :: class . ':getByToken' );

$app -> get( '/worker/{workerId}/review' , \ReviewController :: class . ':review' );
$app -> put( '/review' , \ReviewController :: class . ':updateReview' );

$app -> post( '/auth/logIn', \WorkerController :: class . ':auth' );
$app -> post( '/auth/logOut', \WorkerController :: class . ':logout' );

$app -> get( '/generate/workers', \WorkerController :: class . ':generate' );
$app -> get( '/generate/reviews', \ReviewController :: class . ':generate' );

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
