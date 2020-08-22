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
        $logoVersion = filemtime("_source/media/shared/logo.svg");
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
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch, 'uk-active').'">
                                <a href="'.$this->webBody->web->lastCharacter($this->basePath.$value['id'], '?').'">
                                    '.$this->webBodyNavbarIcon($value).'
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentMainQuery = $value['id'];
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch, 'uk-active').'">
                                <a>'.$this->webBodyNavbarIcon($value).$value['name'].'</a>
                                <div class="uk-navbar-dropdown">
                                    <ul class="uk-nav uk-navbar-dropdown-nav">
                                        '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                                    </ul>
                                </div>
                            </li>
                        ';
                    }
                    break;
                case 1:
                    if (count($value['sub']) == 0 || $value['options']['end'] == true) {
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch, 'uk-active').'">
                                <a href="'.$this->basePath.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'
                                </a>
                            </li>
                        ';
                    } else {
                        $this->currentSubQuery = $value['id'];
                        $navbar .= '
                            <li class="'.$this->webBodyNavbarActive($value['id'], $switch, 'uk-active').'">
                                <a href="'.$this->basePath.$this->currentMainQuery.'/'.$value['id'].'">
                                    '.$value['name'].'
                                </a>
                                <ul class="uk-nav-sub">
                                    '.$this->webBodyNavbar($value['sub'], $switch + 1).'
                                </ul>
                            </li>
                        ';
                    }
                    break;
                case 2:
                    $navbar .= '
                        <li class="'.$this->webBodyNavbarActive($value['id'], $switch, 'uk-active').'">
                            <a href="'.$this->basePath.$this->currentMainQuery.'/'.$this->currentSubQuery.'/'.$value['id'].'">
                                '.$value['name'].'
                            </a>
                        </li>
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
                <i class="fa fa-'.$query['options']['icon'].' fa-fw uk-margin-small-right"></i>
            ';
        }
    }
}