<?php

class WebBodyHeader {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
    }

    public function webBodyHeader() {
        return '
            <header>
                Header
            </header>
        ';
    }
}

$webBodyHeader = new WebBodyHeader($webBody);