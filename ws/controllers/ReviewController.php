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

        $reviewerToken = $request -> getQueryParams();
        $workerId = $args[ 'workerId' ];

        $reviewer = Worker :: find( $workerId );
        $worker = Worker :: where( 'token' , $reviewerToken ) -> first();

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
            'date' => $review -> updated_at -> format( 'd M Y' ),
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
    
    public function updateReview($request, $response, $args) 
    {

        $review = Review :: find( $request -> getParsedBody()['id'] );

        $review -> efficiency = $request -> getParsedBody()[ 'efficiency' ];
        $review -> punctuality = $request -> getParsedBody()[ 'punctuality' ];
        $review -> userRate = $request -> getParsedBody()[ 'userRate' ];

        $review -> save();

    }

}