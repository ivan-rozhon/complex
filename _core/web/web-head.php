<?php

class WebHead {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webHead() {
        return '
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <meta name="description" content="'.$this->web->system->webConfig['webConfig']['description'].'">
                <meta name="keywords" content="'.$this->web->system->webConfig['webConfig']['keywords'].'">
                <meta name="author" content="'.$this->web->system->webConfig['webConfig']['author'].'">

                <title>
                    '.$this->webHeadTitle().'
                </title>

                <!-- Bootstrap core CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

                <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->   
                <!--[if lt IE 9]>
                <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
                <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                <![endif]-->
            </head>
        ';
    }

    public function webHeadTitle() {
        return $this->web->system->webConfig['webConfig']['title'];
    }
}

$webHead = new webHead($web);