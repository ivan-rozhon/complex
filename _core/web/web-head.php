<?php

class WebHead {
    public $web, $postTitle;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function webHead() {
        // TO DO
        // - .js
        // - all with auto-update
        return '
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <meta name="description" content="'.$this->web->webConfig['description'].'">
                <meta name="keywords" content="'.$this->web->webConfig['keywords'].'">
                <meta name="author" content="'.$this->web->webConfig['author'].'">

                <title>
                    '.$this->webHeadTitle().'
                </title>

                <!-- Favicon -->
                <link rel="shortcut icon" href="favicon.ico?v='.filemtime("favicon.ico").'">

                <!-- Bootstrap core CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

                <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->   
                <!--[if lt IE 9]>
                <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
                <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                <![endif]-->

                <!-- CSS -->
                <link rel="stylesheet" type="text/css" href="_styles/web.css?v='.filemtime("_styles/web.css").'">
            </head>
        ';
    }

    public function webHeadTitle() {
        $currentQueryArr = $this->web->sharedRouter->sharedRouterCurrentQuery($this->web->webSchema, $this->web->webConfig);
        switch(count($currentQueryArr)) {
            case 1:
                if ($this->webHeadEmptyPostTitle($currentQueryArr[0]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$currentQueryArr[0]['name'];
                }
                break;
            case 2:
                if ($this->webHeadEmptyPostTitle($currentQueryArr[1]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$currentQueryArr[0]['name'].' '.$this->web->webConfig['titleSeparator'][1].' '.$currentQueryArr[1]['name'];
                }
                break;
            case 3:
                if ($this->webHeadEmptyPostTitle($currentQueryArr[2]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$currentQueryArr[1]['name'].' '.$this->web->webConfig['titleSeparator'][1].' '.$currentQueryArr[2]['name'];
                }
                break;
        }

        return $this->web->webConfig['title'].$this->postTitle;
    }

    public function webHeadEmptyPostTitle($currentQuery) {
        if (in_array($currentQuery['id'], $this->web->webConfig['emptyTitleException'])) {
            $this->postTitle = ' '.$this->web->webConfig['postTitleSeparator'].' '.$this->web->webConfig['postTitle'];
            return FALSE;
        }
        return TRUE;
    }
}

$webHead = new webHead($web);