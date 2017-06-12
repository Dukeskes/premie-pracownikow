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

    public function getById($request, $response, $args) 
    {

        return $response
            -> withJson( $this->table->find( $args[ 'id' ] ) , 200 ); 

    }

    public function getToken($request, $response, $args)
    {
        
        return Worker :: find( 7 ) -> token;

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
                
        $worker = new Worker( $this -> table );

        $worker -> name = $request -> getParsedBody()[ 'name' ]; 
        $worker -> token = $this -> generateToken(); 
        $worker -> surname = $request -> getParsedBody()[ 'surname' ];
        $worker -> birthDate = $request -> getParsedBody()[ 'birthDate' ] ? $request -> getParsedBody()[ 'birthDate' ] : '2017-05-04 16:54:49' ; 
        $worker -> workedHours = $request -> getParsedBody()[ 'workedHours' ];
        $worker -> experienceMonths = $request -> getParsedBody()[ 'experienceMonths' ];
        $worker -> leaveDays = $request -> getParsedBody()[ 'leaveDays' ];
        $worker -> diseaseDays = $request -> getParsedBody()[ 'diseaseDays' ];

        $worker -> save();

    }

    public function auth($request, $response, $args) 
    {

        return $response
            -> withJson( array( 'id' => 3 , 'role' => 'ADMIN' , 'authToken' => $this -> generateToken() , 'username' => 'dupa' ) , 200 );             

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

}