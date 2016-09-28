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
                - router (search query, get schema of query, depth, parent/child?, mainUrl)<br>
                - dynamic:<br>
                -- template(content)<br>
                -- title<br>
                -- menu<br>
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?home">Home</a><br>
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?about">About</a><br>
                <a href="http://127.0.0.1/edsa-php_cms_nosql/?contact">Contact</a><br>
            </main>
        ';
    }
}

$webBodyMain = new webBodyMain($webBody);