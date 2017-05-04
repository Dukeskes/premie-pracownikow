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
            -> withJson( $this -> table -> get() , 200 );

    }

    public function add($request, $response, $args) 
    {
                
        $worker = new Worker( $this -> table );

        $worker -> imie = $request -> getParsedBody()[ 'imie' ]; 
        $worker -> nazwisko = $request -> getParsedBody()[ 'nazwisko' ];
        $worker -> dataUrodzenia = $request -> getParsedBody()[ 'dataUrodzenia' ]; 
        $worker -> przepracowaneGodziny = $request -> getParsedBody()[ 'przepracowaneGodziny' ]; 
        $worker -> doswiadczenie = $request -> getParsedBody()[ 'doswiadczenie' ]; 
        $worker -> ocenaPracownikow = $request -> getParsedBody()[ 'ocenaPracownikow' ]; 
        $worker -> ocenaPM = $request -> getParsedBody()[ 'ocenaPM' ]; 
        $worker -> wskaznikPremii = $request -> getParsedBody()[ 'wskaznikPremii' ]; 
        $worker -> urlopy = $request -> getParsedBody()[ 'urlopy' ]; 
        $worker -> chorobowe = $request -> getParsedBody()[ 'chorobowe' ]; 
        $worker -> terminowosc = $request -> getParsedBody()[ 'terminowosc' ]; 
        $worker -> efektywnosc = $request -> getParsedBody()[ 'efektywnosc' ];

        $worker -> save();

    }

}