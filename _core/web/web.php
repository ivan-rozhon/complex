<?php

class Web {
    public $system, $sharedRouter, $webSchema, $webConfig;

    public function __construct(System $system, SharedRouter $sharedRouter) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->webSchema = json_decode(file_get_contents('./_source/web-schema.json'), TRUE)['webSchema'];
        $this->webConfig = json_decode(file_get_contents('./_source/web-config.json'), TRUE)['webConfig'];
    }

    public function web($webHead, $webBody) {
        echo '
            <!DOCTYPE html>
            <html lang="'.$this->webConfig['lang'].'">
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