<?php

class Worker {

    private $imie; 
    private $nazwisko;
    private $dataUrodzenia; 
    private $przepracowaneGodziny; 
    private $doswiadczenie; 
    private $ocenaPracownikow; 
    private $ocenaPM; 
    private $wskaznikPremii; 
    private $urlopy; 
    private $chorobowe; 
    private $terminowosc; 
    private $efektywnosc;

    public static function getList() {

        return array(
            'date' => date( 'y M' ),
            'list' => array(
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ],
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ],
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ],
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ],
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ],
                [
                    'imie' => 'Marcin',
                    'nazwisko' => 'Nowak',
                    'wiek' => 19,
                    'przepracowaneGodziny' => 180,
                    'doswiadczenie' => 42,
                    'ocenaPracownikow' => 53,
                    'ocenaPM' => 76,
                    'wskaznikPremii' => 34,
                    'urlopy' => 23,
                    'chorobowe' => 5,
                    'terminowosc' => 94,
                    'efektywnosc' => 76
                ]
            )
        );
    }

    

    public function setFromArray( $array ) {

        if( isset( $array [ 'imie' ] ) && $array[ 'imie' ] )
            $this -> imie = $array[ 'imie' ];

        if( isset( $array [ 'nazwisko' ] ) && $array[ 'nazwisko' ] )
            $this -> nazwisko = $array[ 'nazwisko' ];

        if( isset( $array [ 'dataUrodzenia' ] ) && $array[ 'dataUrodzenia' ] )
            $this -> dataUrodzenia = $array[ 'dataUrodzenia' ];

        if( isset( $array [ 'przepracowaneGodziny' ] ) && $array[ 'przepracowaneGodziny' ] )
            $this -> przepracowaneGodziny = $array[ 'przepracowaneGodziny' ];

        if( isset( $array [ 'doswiadczenie' ] ) && $array[ 'doswiadczenie' ] )
            $this -> doswiadczenie = $array[ 'doswiadczenie' ];

        if( isset( $array [ 'ocenaPracownikow' ] ) && $array[ 'ocenaPracownikow' ] )
            $this -> ocenaPracownikow = $array[ 'ocenaPracownikow' ];

        if( isset( $array [ 'ocenaPM' ] ) && $array[ 'ocenaPM' ] )
            $this -> ocenaPM = $array[ 'ocenaPM' ];

        if( isset( $array [ 'wskaznikPremii' ] ) && $array[ 'wskaznikPremii' ] )
            $this -> wskaznikPremii = $array[ 'wskaznikPremii' ];

        if( isset( $array [ 'urlopy' ] ) && $array[ 'urlopy' ] )
            $this -> urlopy = $array[ 'urlopy' ];

        if( isset( $array [ 'chorobowe' ] ) && $array[ 'chorobowe' ] )
            $this -> chorobowe = $array[ 'chorobowe' ];

        if( isset( $array [ 'terminowosc' ] ) && $array[ 'terminowosc' ] )
            $this -> terminowosc = $array[ 'terminowosc' ];

        if( isset( $array [ 'efektywnosc' ] ) && $array[ 'efektywnosc' ] )
            $this -> efektywnosc = $array[ 'efektywnosc' ];    

    }  

}