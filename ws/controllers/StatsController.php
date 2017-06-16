<?php

class StatsController {

    private $logger;
    protected $table;

    public function __construct( $logger, $table ) {

        $this -> logger = $logger;
        $this -> table = $table;

    }

    public function __invoke($request, $response, $args)
    {
        $widgets = $this -> table -> get();

        return $response;
    }

    public function getStats($request, $response, $args) 
    {

        $stats = array( 
            'avgRatePm' => 89,
            'avgRateWorkers' => 92,
            'biggestBonus' => 25,
            'increaseEfficiency' => 17,
            'increasePunctuality' => 22,
            'mostPopularName' => "Marcin",
            'reviewsCount' => count( Review :: all() ) ,
            'workersCount' => count( Worker :: all() )
        );

        return $response -> withJson( $stats , 200 ); 

    }

}