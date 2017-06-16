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
        $workers = Worker :: all() -> toArray();
        $nameCount = array();

        $mostPopularCount = 0;
        $mostPopularName = array();

        $avgRateWorkers = 0;
        $avgRatePm = 0;

        foreach ($workers as $key => $worker)
        {       

            $workers[$key] = $this -> getWorkerReviews( $worker );

            if( isset( $nameCount[ $worker['name'] ] ) )
                $nameCount[ $worker[ 'name' ] ] += 1;
            else
                $nameCount[ $worker[ 'name' ] ] = 1;

            $avgRateWorkers += $workers[ $key ][ 'workersRate' ];
            $avgRatePm += $workers[ $key ][ 'summaryRate' ];

        }

        usort( $workers , function($a, $b) {

            if ($a['bonusRate'] == $b['bonusRate'])
                return 0;

            return ($a['bonusRate'] < $b['bonusRate']) ? 1 : -1;

        });

        foreach ($nameCount as $name => $count) {

            if( $count > $mostPopularCount )
            {
                $mostPopularName = array( $name );
                $mostPopularCount = $count;
            }
            else if( $count = $mostPopularCount )
                $mostPopularName[] = $name;

        }
             
        $stats = array( 
            'avgRatePm' => $avgRatePm / count( $workers ),
            'avgRateWorkers' => $avgRateWorkers / count( $workers ),
            'biggestBonus' => $workers[0]['bonusRate'],
            'increaseEfficiency' => 17,
            'increasePunctuality' => 22,
            'mostPopularName' => implode(', ',$mostPopularName),
            'reviewsCount' => count( Review :: all() ) ,
            'workersCount' => count( Worker :: all() )
        );

        return $response -> withJson( $stats , 200 ); 

    }

    private function getWorkerReviews( $worker )
    {

        $reviews = Review :: where( 'workerID' , $worker['id'] ) -> get();

        $countEfficiency = 0;
        $countPunctuality = 0;
        $countUserRate = 0;
        
        foreach ($reviews as $reviewId => $review) {

            $countEfficiency += $review -> efficiency;
            $countPunctuality += $review -> punctuality;
            $countUserRate += $review -> userRate;

        }

        $worker['efficiency'] = $countEfficiency / count($reviews);
        $worker['punctuality'] = $countPunctuality / count($reviews);
        $worker['workersRate'] = $countUserRate / count($reviews);
        $worker['summaryRate'] = ( $worker['efficiency'] + $worker['punctuality'] + $worker['workersRate'] ) / 3;

        $worker['bonusRate'] = 0;

        if( $worker['summaryRate'] > 50 )
            $worker['bonusRate'] = ceil(( $worker['summaryRate'] - 50 ) / 2);

        return $worker;        

    }

}