<?php

class WebBodyNav {
    public $webBody, $baseUrl, $currentQueryArr;

    private $currentMainQuery, $currentSubQuery;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->baseUrl = $this->webBody->web->sharedRouter->sharedRouterBaseUrl();
        $this->currentQueryArr = $this->webBody->web->currentQueryArr;
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

    private function webBodyNavbar($schema, $switch) {
        $navbar = '';
        foreach($schema as $key => $value) {
            switch($switch) {
                case 0:
                    if (count($value['sub']) == 0) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a href="'.$this->baseUrl.'?'.$value['id'].'">
                                    '.$this->webBodyNavbarGlyphicon($value).'
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentMainQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    '.$this->webBodyNavbarGlyphicon($value).'
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

    private function webBodyNavbarActive($query, $index) {
        if (isset($this->currentQueryArr[$index]['id']) && $this->currentQueryArr[$index]['id'] == $query) {
            return 'active';
        }
    }

    private function webBodyNavbarGlyphicon($query) {
        if (isset($query['options']['glyphicon'])) {
            return '
                <span class="'.$query['options']['glyphicon'].'"></span>
            ';
        }
    }
}

$webBodyNav = new WebBodyNav($webBody, $sharedRouter);