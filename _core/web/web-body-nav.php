<?php

class WebBodyNav {
    public $webBody, $baseUrl, $currentMainQuery, $currentSubQuery;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->baseUrl = $this->webBody->web->sharedRouter->sharedRouterBaseUrl();
    }

    public function webBodyNav() {
        // TO DO
        // - active queries in navbar
        return '
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="'.$this->baseUrl.'">
                        <img alt="Brand" height="20" src="_source/_images/shared/favicon-32x32.png">
                    </a>
                </div>
                    <ul class="nav navbar-nav">                        
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
                    if (count($value['sub']) == 0) {
                        $navbar .= '
                            <li><a href="'.$this->baseUrl.'?'.$value['id'].'">'.$value['name'].'</a></li>
                        ';
                    } else {
                        $this->currentMainQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    '.$value['name'].'<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    '.$this->webBodyNavbar($value['sub'], 2).'
                                </ul>
                            </li>
                        ';
                    }
                    break;
                case 2:
                    if (count($value['sub']) == 0) {
                        $navbar .= '
                            <li>
                                <a href="'.$this->baseUrl.'?'.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentSubQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown-submenu">
                                <a class="test" href="'.$this->baseUrl.'?'.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    '.$this->webBodyNavbar($value['sub'], 3).'
                                </ul>
                            </li>
                        ';
                    }
                    break;
                case 3:
                    $navbar .= '
                        <li>
                            <a href="'.$this->baseUrl.'?'.$this->currentMainQuery.'/'.$this->currentSubQuery.'/'.$value['id'].'">
                                '.$value['name'].'
                            </a>
                        </li>
                    ';
                    break;
            }
            
        }
        return $navbar;
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);