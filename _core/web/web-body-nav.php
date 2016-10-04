<?php

class WebBodyNav {
    public $webBody, $baseUrl, $currentQuery, $currentMainQuery, $currentSubQuery;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->baseUrl = $this->webBody->web->sharedRouter->sharedRouterBaseUrl();
        $this->currentQuery = $this->webBody->web->sharedRouter->sharedRouterCurrentQuery($this->webBody->web->webSchema, $this->webBody->web->webConfig);
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
                        '.$this->webBodyNavbar($this->webBody->web->webSchema['webSchemaMain'], 0).'
                    </ul>
                </div>
            </nav>
        ';
    }

    public function webBodyNavbar($schema, $switch) {
        $navbar = '';
        foreach($schema as $key => $value) {
            switch($switch) {
                case 0:
                    if (count($value['sub']) == 0) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'"><a href="'.$this->baseUrl.'?'.$value['id'].'">'.$value['name'].'</a></li>
                        ';
                    } else {
                        $this->currentMainQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    '.$value['name'].'<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                                </ul>
                            </li>
                        ';
                    }
                    break;
                case 1:
                    if (count($value['sub']) == 0) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a href="'.$this->baseUrl.'?'.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentSubQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown-submenu '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="test" href="'.$this->baseUrl.'?'.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                                </ul>
                            </li>
                        ';
                    }
                    break;
                case 2:
                    $navbar .= '
                        <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'">
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

    public function webBodyNavbarActive($query, $index) {
        if (isset($this->currentQuery[$index]['id']) && $this->currentQuery[$index]['id'] == $query) {
            return 'active';
        }
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);