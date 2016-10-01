<?php

class Web {
    public $system;

    public function __construct(System $system, SharedRouter $sharedRouter) {
       $this->system = $system;
       $this->sharedRouter = $sharedRouter;
    }

    public function web($webHead, $webBody) {
        echo '
            <!DOCTYPE html>
            <html lang="'.$this->system->webConfig['webConfig']['lang'].'">
                '.$webHead.'
                '.$webBody.'
            </html>
        ';
    }
}

$web = new Web($system, $sharedRouter);

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