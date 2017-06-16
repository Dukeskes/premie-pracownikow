<?php

class WorkerController {

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

    public function getList($request, $response, $args) 
    {

        return $response
            -> withJson( array( 'entries' => $this -> table -> get() , 'numerOfAll' => count($this -> table -> get()) ) , 200 ); 

    }

    public function getBest($request, $response, $args) 
    {

        $workers = Worker :: all() -> toArray();

        foreach ($workers as $key => $worker)            
            $workers[$key] = $this -> getWorkerReviews( $worker );

        usort( $workers , function($a, $b) {

            if ($a['bonusRate'] == $b['bonusRate'])
                return 0;

            return ($a['bonusRate'] < $b['bonusRate']) ? 1 : -1;

        });

        return $response
            -> withJson( array( 'entries' => array_slice($workers, 0, 15) , 'numerOfAll' => count($workers) ) , 200 ); 

    }

    public function getById($request, $response, $args) 
    {

        return $response
            -> withJson( $this->table->find( $args[ 'id' ] ) , 200 ); 

    }

    public function removeById($request, $response, $args)
    {

        Worker :: destroy( $args[ 'id' ] );

        return $response;

    }

    public function getToken($request, $response, $args)
    {
        
        return Worker :: find( $args[ 'id' ] ) -> token;

    }

    public function getByToken($request, $response, $args)
    {

        $worker = Worker :: where( 'token' , $args[ 'token' ] ) -> first();

        $worker = $this -> getWorkerReviews( $worker );

        return $response -> withJson( $worker , 200);

    }

    public function update($request, $response, $args)
    {

        $worker = Worker :: find( $request -> getParsedBody()[ 'id' ] );

        $worker -> surname = $request -> getParsedBody()[ 'surname' ];
        $worker -> birthDate = $request -> getParsedBody()[ 'birthDate' ] ? $request -> getParsedBody()[ 'birthDate' ] : '2017-05-04 16:54:49' ; 
        $worker -> workedHours = $request -> getParsedBody()[ 'workedHours' ];
        $worker -> experienceMonths = $request -> getParsedBody()[ 'experienceMonths' ];
        $worker -> leaveDays = $request -> getParsedBody()[ 'leaveDays' ];
        $worker -> diseaseDays = $request -> getParsedBody()[ 'diseaseDays' ];

        $worker -> save();

    }

    public function add($request, $response, $args) 
    {
                
        $worker = new Worker();

        $worker -> name = $request -> getParsedBody()[ 'name' ]; 
        $worker -> token = $this -> generateToken();
        $worker -> role = 'USER'; 
        $worker -> surname = $request -> getParsedBody()[ 'surname' ];
        $worker -> username = strtolower( $worker -> name ) . '.' . strtolower( $worker -> surname ); 
        $worker -> birthDate = $request -> getParsedBody()[ 'birthDate' ] ? $request -> getParsedBody()[ 'birthDate' ] : '2017-05-04 16:54:49' ; 
        $worker -> workedHours = $request -> getParsedBody()[ 'workedHours' ];
        $worker -> experienceMonths = $request -> getParsedBody()[ 'experienceMonths' ];
        $worker -> leaveDays = $request -> getParsedBody()[ 'leaveDays' ];
        $worker -> diseaseDays = $request -> getParsedBody()[ 'diseaseDays' ];

        $worker -> save();

    }

    public function auth($request, $response, $args) 
    {

        $fullName = explode( '.' , $request -> getParsedBody()[ 'login' ] );

        $User = Worker :: where( 'name' , 'LIKE' , $fullName[ 0 ] ) -> where( 'surname' , 'LIKE' , $fullName[ 1 ] ) -> first();       

        return $response
            -> withJson( array( 'id' => $User -> id , 'role' => $User -> role , 'authToken' => $User -> token , 'name' => $User -> username ) , 200 );             

    }

    public function logout($request, $response, $args) 
    {
        
        return $response -> withJson( array('logout' => true) , 200 );          

    }

    private function generateToken() 
    {

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 12; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;

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

    public function generate($request, $response, $args) 
    {

        $names = array(
            'Christopher',
            'Ryan',
            'Ethan',
            'John',
            'Zoey',
            'Sarah',
            'Michelle',
            'Samantha',
            'Sabina',
            'Oskar',
            'Bartlomiej',
            'Marcin'
        );
        
        $surnames = array(
            'Walker',
            'Thompson',
            'Anderson',
            'Johnson',
            'Tremblay',
            'Peltier',
            'Cunningham',
            'Simpson',
            'Mercado',
            'Sellers',
            'Golonka',
            'Chajdas',
            'Duda',
            'Nowak'
        );   
        
        foreach ($names as $name) {
            
            foreach ($surnames as $surname) {
            
                $worker = new Worker();

                $worker -> name = $name; 
                $worker -> token = $this -> generateToken();
                $worker -> role = 'USER'; 
                $worker -> surname = $surname;
                $worker -> username = strtolower( $worker -> name ) . '.' . strtolower( $worker -> surname ); 
                $worker -> birthDate = date("d M Y", mt_rand(1, time()));
                $worker -> workedHours = rand( 0 , 200 );
                $worker -> experienceMonths = rand( 0 , 200 );
                $worker -> leaveDays = rand( 0 , 60 );
                $worker -> diseaseDays = rand( 0 , 60 );

                $worker -> save();

            }

        }

    }

}