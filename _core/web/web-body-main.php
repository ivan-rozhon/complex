<?php

class WebBodyMain {
    public $webBody, $currentQueryArr;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->currentQueryArr = $this->webBody->web->currentQueryArr;
    }

    public function webBodyMain() {
        // TO DO
        // dynamic template(content)
        return '
            <main>
                Main<br>
                '.$this->currentQueryArr[count($this->currentQueryArr) - 1]['template'].'
            </main>
        ';
    }
}

$webBodyMain = new webBodyMain($webBody);