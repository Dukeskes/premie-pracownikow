<?php

class Worker extends \Illuminate\Database\Eloquent\Model {

    private $dbConn;

    public function __construct( $dbConn )
    {

        $this -> dbConn = $dbConn;

    }

    public static function getList( $table ) {

        return array(
            'list' => $table -> get()
        );
        
    }    

}