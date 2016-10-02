<?php

class WebBodyNav {
    public $webBody, $baseUrl;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->baseUrl = $this->webBody->web->sharedRouter->sharedRouterBaseUrl();
    }

    public function webBodyNav() {
        return '
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="'.$this->baseUrl.'">
                        <img alt="Brand" height="20" src="_source/_images/shared/favicon-32x32.png">
                    </a>
                </div>
                    <ul class="nav navbar-nav">
                        <li><a href="">Home</a></li>
                        <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Page 1-1</a></li>
                            <li><a href="#">Page 1-2</a></li>
                            <li class="dropdown-submenu">
                                <a class="test" href="#">Another dropdown <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                <li><a href="#">3rd level dropdown</a></li>
                                <li><a href="#">3rd level dropdown</a></li>
                                </ul>
                            </li>
                        </ul>
                        </li>
                        '.$this->webBodyNavbar($this->webBody->web->webSchema['webSchemaMain'], 1).'
                    </ul>
                </div>
            </nav>
        ';
    }

    public function webBodyNavbar($schema, $switch) {
        $navbar = '';
        foreach($schema as $key => $value) {
            switch($switch) {
                case 1:
                    $navbar .= '
                        <li><a href="'.$this->baseUrl.'?'.$value['id'].'">'.$value['name'].'</a></li>
                    ';
                    $navbar .= $this->webBodyNavbar($value['sub'], 2);
                break;
            }
            
        }
        return $navbar;
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);