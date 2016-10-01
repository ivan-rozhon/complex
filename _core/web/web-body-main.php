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
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?home">Home</a><br>
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?about">About</a><br>
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?contact">Contact</a><br>
            </main>
        ';
    }
}

$webBodyMain = new webBodyMain($webBody);