<?php

class Worker extends \Illuminate\Database\Eloquent\Model {

    protected $dbConn;
    protected $table = 'workers';

    public static function getList( $table ) {

        return array(
            'list' => $table -> get()
        );
        
    }    

}