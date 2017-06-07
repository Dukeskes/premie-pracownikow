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
            -> withHeader('Access-Control-Allow-Origin', '*')
            -> withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            -> withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            -> withJson( array( 'entries' => $this -> table -> get() , 'numerOfAll' => count($this -> table -> get()) ) , 200 ); 

    }

    public function getToken($request, $response, $args)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 12; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    public function add($request, $response, $args) 
    {
                
        $worker = new Worker( $this -> table );

        $worker -> name = $request -> getParsedBody()[ 'name' ]; 
        $worker -> surname = $request -> getParsedBody()[ 'surname' ];
        $worker -> birthDate = $request -> getParsedBody()[ 'birthDate' ] ? $request -> getParsedBody()[ 'birthDate' ] : '2017-05-04 16:54:49' ; 

        $worker -> save();

    }

}