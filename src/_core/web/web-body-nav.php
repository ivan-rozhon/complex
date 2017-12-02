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
        $baseUrl = $this->baseUrl;
        $basePath = $this->basePath;
        $navbar = $this->webBodyNavbar($this->webBody->web->webSchema['webSchemaMain'], 0);
        $logoVersion = filemtime("_source/media/shared/logo-32x32.png");
        return $this->templateProvider->sharedTemplateProvider(
                [
                    'baseUrl' => $baseUrl,
                    'basePath' => $basePath,
                    'navbar' => $navbar,
                    'logoVersion' => $logoVersion
                ],
                '_core/web/web-body-nav.html'
            );
    }

    private function webBodyNavbar($schema, $switch) {
        $navbar = '';
        foreach($schema as $key => $value) {
            switch($switch) {
                case 0:
                    if (count($value['sub']) == 0 || $value['options']['end'] == true) {
                        $navbar .= '
                            <li class="nav-item m-2 '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="nav-link" href="'.$this->webBody->web->lastCharacter($this->basePath.$value['id'], '?').'">
                                    '.$this->webBodyNavbarIcon($value).'
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentMainQuery = $value['id'];
                        $navbar .= '
                            <li class="nav-item m-2 dropdown '.$this->webBodyNavbarActive($value['id'], $switch).'">
                                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                                    id="'.$value['id'].'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    '.$this->webBodyNavbarIcon($value).'
                                    '.$value['name'].'
                                </a>
                                <div class="dropdown-menu" aria-labelledby="'.$value['id'].'">
                                    '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                                </div>
                            </li>
                        ';
                    }
                    break;
                case 1:
                    if (count($value['sub']) == 0 || $value['options']['end'] == true) {
                        $navbar .= '
                            <a class="dropdown-item '.$this->webBodyNavbarActive($value['id'], $switch).'"
                                href="'.$this->basePath.$this->currentMainQuery.'/'.$value['id'].'">
                                '.$value['name'].'
                            </a>
                        ';
                    } else {
                        $this->currentSubQuery = $value['id'];
                        $navbar .= '
                            <a class="dropdown-item dropdown-sub dropdown-sub-md '.$this->webBodyNavbarActive($value['id'], $switch).'"
                                href="'.$this->basePath.$this->currentMainQuery.'/'.$value['id'].'">
                                '.$value['name'].'
                            </a>
                            <div class="dropdown-sub-menu">
                                '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                            </div>
                        ';
                    }
                    break;
                case 2:
                    $navbar .= '
                        <a class="dropdown-item '.$this->webBodyNavbarActive($value['id'], $switch).'"
                            href="'.$this->basePath.$this->currentMainQuery.'/'.$this->currentSubQuery.'/'.$value['id'].'">
                            '.$value['name'].'
                        </a>
                    ';
                    break;
            }

        }
        return $navbar;
    }

    private function webBodyNavbarActive($query, $index, $class = 'active') {
        if (isset($this->currentQueryArr[$index]['id']) && $this->currentQueryArr[$index]['id'] == $query) {
            return $class;
        }
    }

    private function webBodyNavbarGlyphicon($query) {
        if (isset($query['options']['glyphicon'])) {
            return '
                <span class="'.$query['options']['glyphicon'].'"></span>
            ';
        }
    }

    private function webBodyNavbarIcon($query) {
        if (isset($query['options']['icon']) && $query['options']['icon'] !== 'none') {
            return '
                <i class="fa fa-'.$query['options']['icon'].' fa-fw"></i>
            ';
        }
    }
}