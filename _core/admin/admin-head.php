<?php

class AdminHead {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
    }

    public function adminHead() {
        return '
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                
                <meta name="description" content="'.$this->admin->adminConfig['description'].'">
                <meta name="keywords" content="'.$this->admin->adminConfig['keywords'].'">
                <meta name="author" content="'.$this->admin->adminConfig['author'].'">

                <title>
                    '.$this->admin->adminConfig['title'].'
                </title>

                <!-- Favicon -->
                <link rel="shortcut icon" href="favicon.ico?v='.filemtime("favicon.ico").'">

                <!-- Angular Material style sheet -->
                <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
                
                <!-- Google Fonts -->
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
            </head>
        ';
    }
}

$adminHead = new AdminHead($admin);