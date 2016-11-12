<?php

class WebBodyFooter {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
    }

    public function webBodyFooter() {
        return '
            <footer>
                Footer              
            </footer>
        ';
    }
}