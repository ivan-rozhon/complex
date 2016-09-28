<?php

class Web {
    public $system;

    public function __construct(System $system) {
       $this->system = $system;
    }

    public function web($webHead, $webBody) {
        echo '
            <!DOCTYPE html>
            <html lang="en">
                '.$webHead.'
                '.$webBody.'
            </html>
        ';
    }
}

$web = new Web($system);

require './_core/web/web-head.php';
require './_core/web/web-body.php';

$web->web(
    $webHead->webHead(),
    $webBody->webBody(
        $webBodyHeader->webBodyHeader(),
        $webBodyNav->webBodyNav(),
        $webBodyMain->webBodyMain(),
        $webBodyFooter->webBodyFooter()
        )
);