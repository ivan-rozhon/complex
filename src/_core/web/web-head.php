<?php

class WebHead {
    public $web, $currentQueryArr;

    private $postTitle;

    public function __construct(Web $web) {
        $this->web = $web;
        $this->currentQueryArr = $this->web->currentQueryArr;
        $this->templateProvider = $this->web->templateProvider;
    }

    public function webHead() {
        $description = $this->web->webConfig['description'];
        $keywords = $this->web->webConfig['keywords'];
        $author = $this->web->webConfig['author'];
        $title = $this->webHeadTitle();
        $faviconVersion = filemtime("favicon.ico");
        $cssVersion = filemtime("_core/web/_styles/web.min.css");
        return $this->templateProvider->sharedTemplateProvider(
                [
                    'description' => $description,
                    'keywords' => $keywords,
                    'author' => $author,
                    'title' => $title,
                    'faviconVersion' => $faviconVersion,
                    'cssVersion' => $cssVersion
                ],
                '_core/web/web-head.html'
            );
    }

    private function webHeadTitle() {
        switch(count($this->currentQueryArr)) {
            case 1:
                if ($this->webHeadEmptyPostTitle($this->currentQueryArr[0]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$this->currentQueryArr[0]['name'];
                }
                break;
            case 2:
                if ($this->webHeadEmptyPostTitle($this->currentQueryArr[1]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$this->currentQueryArr[0]['name'].' '.$this->web->webConfig['titleSeparator'][1].' '.$this->currentQueryArr[1]['name'];
                }
                break;
            case 3:
                if ($this->webHeadEmptyPostTitle($this->currentQueryArr[2]) == TRUE) {
                    $this->postTitle = ' '.$this->web->webConfig['titleSeparator'][0].' '.$this->currentQueryArr[1]['name'].' '.$this->web->webConfig['titleSeparator'][1].' '.$this->currentQueryArr[2]['name'];
                }
                break;
        }

        return $this->web->webConfig['title'].$this->postTitle;
    }

    private function webHeadEmptyPostTitle($currentQuery) {
        if (in_array($currentQuery['id'], $this->web->webConfig['emptyTitleException'])) {
            $this->postTitle = ' '.$this->web->webConfig['postTitleSeparator'].' '.$this->web->webConfig['postTitle'];
            return FALSE;
        }
        return TRUE;
    }
}