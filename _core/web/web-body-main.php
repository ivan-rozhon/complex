<?php

class WebBodyMain {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
    }

    public function webBodyMain() {
        return '
            <main>
                Main<br>
                TO DO:<br>
                - dynamic:<br>
                -- template(content)<br>
                -- nav<br>
            </main>
        ';
    }
}

$webBodyMain = new webBodyMain($webBody);