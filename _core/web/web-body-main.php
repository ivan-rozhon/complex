<?php

class WebBodyMain {
    public $webBody, $currentQueryArr;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->currentQueryArr = $this->webBody->web->currentQueryArr;
    }

    public function webBodyMain($template) {
        return '
            <main>
                '.$template.'
            </main>
        ';
    }
}

$webBodyMain = new WebBodyMain($webBody);