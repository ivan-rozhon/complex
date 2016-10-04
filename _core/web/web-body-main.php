<?php

class WebBodyMain {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
    }

    public function webBodyMain() {
        // TO DO
        // dynamic template(content)
        return '
            <main>
                Main
            </main>
        ';
    }
}

$webBodyMain = new webBodyMain($webBody);