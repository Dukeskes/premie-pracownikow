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
        $worker -> dataUrodzenia = $request -> getParsedBody()[ 'dataUrodzenia' ] ? $request -> getParsedBody()[ 'dataUrodzenia' ] : '2017-05-04 16:54:49' ; 
        $worker -> przepracowaneGodziny = $request -> getParsedBody()[ 'przepracowaneGodziny' ] ? $request -> getParsedBody()[ 'przepracowaneGodziny' ] : 50 ; 
        $worker -> doswiadczenie = $request -> getParsedBody()[ 'doswiadczenie' ] ? $request -> getParsedBody()[ 'doswiadczenie' ] : 50 ; 
        $worker -> ocenaPracownikow = $request -> getParsedBody()[ 'ocenaPracownikow' ] ? $request -> getParsedBody()[ 'ocenaPracownikow' ] : 50 ; 
        $worker -> ocenaPM = $request -> getParsedBody()[ 'ocenaPM' ] ? $request -> getParsedBody()[ 'ocenaPM' ] : 50 ; 
        $worker -> wskaznikPremii = $request -> getParsedBody()[ 'wskaznikPremii' ] ? $request -> getParsedBody()[ 'wskaznikPremii' ] : 50 ; 
        $worker -> urlopy = $request -> getParsedBody()[ 'urlopy' ] ? $request -> getParsedBody()[ 'urlopy' ] : 50 ; 
        $worker -> chorobowe = $request -> getParsedBody()[ 'chorobowe' ] ? $request -> getParsedBody()[ 'chorobowe' ] : 50 ; 
        $worker -> terminowosc = $request -> getParsedBody()[ 'terminowosc' ] ? $request -> getParsedBody()[ 'terminowosc' ] : 50 ; 
        $worker -> efektywnosc = $request -> getParsedBody()[ 'efektywnosc' ] ? $request -> getParsedBody()[ 'efektywnosc' ] : 50 ;

        $worker -> save();

    }

}