<?php

class System {
    public $username;

    public function __construct(){
         $this->username = "ivan";
    }
}

class Database {
    public $link;

    public function __construct(){
         $this->link = "link";
    }
}

class Design {

    private $sys, $db;

    public function __construct(System $sys, Database $db) {
       $this->sys = $sys;
       $this->db = $db;
    }

    function setting(){
        echo $this->sys->username;
        echo $this->db->link;
    }
}

$sys = new System;
$db = new Database;
$design = new Design($sys, $db);

$design->setting();