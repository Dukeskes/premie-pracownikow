<?php
// Routes

$app -> get( '/worker/' , WorkerController :: class , 'home' );

$app -> get( '/workertmp/' , function ($request, $response, $args) {
    
    die( json_encode( array(
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
        )));

});

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
