<?php

class WebBodyNav {
    public $webBody, $baseUrl, $currentQueryArr;

    private $currentMainQuery, $currentSubQuery;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->baseUrl = $this->webBody->web->sharedRouter->baseUrl();
        $this->basePath = $this->webBody->web->sharedRouter->basePath();
        $this->currentQueryArr = $this->webBody->web->currentQueryArr;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyNav() {
        $basePath = $this->basePath;
        $navbar = $this->webBodyNavbar($this->webBody->web->webSchema['webSchemaMain'], 0);
        $iconVersion = filemtime("_source/images/shared/favicon-32x32.png");
        return $this->templateProvider->sharedTemplateProvider(
                ['basePath' => $basePath, 'navbar' => $navbar, 'iconVersion' => $iconVersion],
                '_core/web/web-body-nav.html'
            );
    }

    private function webBodyNavbar($schema, $switch) {
        $navbar = '';
        foreach($schema as $key => $value) {
            switch($switch) {
                case 0:
                    if (count($value['sub']) == 0 || $value['options']['only'] == true) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a href="'.$this->webBody->web->lastCharacter($this->basePath.'?'.$value['id'], '?').'">
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
                    if (count($value['sub']) == 0 || $value['options']['only'] == true) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a href="'.$this->basePath.'?'.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentSubQuery = $value['id'];
                        $navbar .= '
                            <li class="dropdown-submenu '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="test" href="'.$this->basePath.'?'.$this->currentMainQuery.'/'.$value['id'].'">
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
                            <a href="'.$this->basePath.'?'.$this->currentMainQuery.'/'.$this->currentSubQuery.'/'.$value['id'].'">
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