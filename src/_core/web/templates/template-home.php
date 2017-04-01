<?php

class TemplateHome {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateHome() {
        $title = $this->web->templateData['title'];
        $info = $this->web->templateData['showInfo'] ? '<p class="info">'.$this->web->templateData['info'].'</p>' : '';
        $editor = $this->web->templateData['editor'];
        $theme = $this->web->templateData['theme'];
        $news = $this->templateHomeNews($this->web->templateData['news']);

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'title' => $title,
                    'info' => $info,
                    'editor' => $editor,
                    'theme' => $theme,
                    'news' => $news
                ],
                '_core/web/templates/template-home.html'
            );
    }

    private function templateHomeNews($newsArray) {
        $news = '';

        foreach($newsArray as $key => $value) {
            $news .=
                '<hr>
                <h4>'.$value['title'].'</h4>
                <p>'.$value['info'].'</p>
                <div>'.$value['editor'].'</div>';

                foreach($value['tags'] as $tagKey => $tagValue) {
                    $news .= '<span class="label label-default">'.$tagValue.'</span>';
                }

                $news .= '<div class="links">';
                    foreach($value['links'] as $lingKey => $linkValue) {
                        $news .= '<a href="'.$linkValue['url'].'" target="_blank">'.$linkValue['title'].'</a><br>';
                    }
                $news .= '</div>';
        }

        $news .= '<hr>';

        return $news;
    }
}

$templateHome = new TemplateHome($web, $sharedTemplateProvider);