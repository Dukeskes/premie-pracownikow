<?php

class ReviewController {

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

    public function review($request, $response, $args) 
    {

        $workerId = $args[ 'workerId' ];
        $worker = Worker :: find( $workerId );

        $reviewerToken = $request -> getQueryParams();
        $reviewer = Worker :: where( 'token' , $reviewerToken ) -> first();

        $review = Review :: where( 'reviewerID' , $reviewer -> id ) -> where( 'workerID' , $worker -> id );

        if( $review -> count() == 0 )
        {
            $review = new Review();
            $review -> reviewerID = $reviewer -> id;
            $review -> workerID = $worker -> id;

            $result = $review -> save();

            $review = Review :: where( 'reviewerID' , $reviewer -> id ) -> where( 'workerID' , $worker -> id ) -> first();
        }
        else
            $review = $review -> first();

        $review = array(
            'date' => $review -> updated_at,
            'efficiency' => $review -> efficiency,
            'id' => $review -> id,
            'punctuality' => $review -> punctuality,
            'reviewerID' => $reviewer -> id,
            'reviewerRole' => "USER",
            'userRate' => $review -> userRate,
            'worker' => $worker
        );

        return $response -> withJson( $review , 200 ); 

    }

}