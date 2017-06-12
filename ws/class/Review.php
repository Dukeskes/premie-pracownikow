<?php

class Review extends \Illuminate\Database\Eloquent\Model {

    protected $dbConn;
    protected $table = 'reviews';

    public static function getList( $table ) {

        return array(
            'list' => $table -> get()
        );
        
    }    

}