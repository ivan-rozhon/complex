<?php

class System {
    public $title;

    public function __construct(){
        // $this->title = filter_input(INPUT_GET, 'title');
        $this->title = 'NoSQL PHP CMS';
    }
}

$system = new System;

require '_core/web/web.php';