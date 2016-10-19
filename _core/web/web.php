<?php

class Web {
    public $system, $sharedRouter, $webSchema, $webConfig, $currentQueryArr, $currentQuery;

    public function __construct(System $system, SharedRouter $sharedRouter) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->webSchema = json_decode(file_get_contents('_source/web-schema.json'), TRUE)['webSchema'];
        $this->webConfig = json_decode(file_get_contents('_source/web-config.json'), TRUE)['webConfig'];
        $this->currentQueryArr = $this->sharedRouter->sharedRouterCurrentQuery($this->webSchema, $this->webConfig);
        $this->currentQuery = $this->currentQueryArr[count($this->currentQueryArr) - 1];
        $this->templateData = $this->webTemplateData($this->lastCharacter('data-'.$this->currentQuery['id'], '-'));
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

    public function webTemplateImport() {
        return '_core/web/_templates/'.$this->currentQuery['template'].'.php';
    }

    public function webTemplateData($file) {
        if (file_exists('_source/_data/'.$file.'.json')) {
            return json_decode(file_get_contents('_source/_data/'.$file.'.json'), TRUE)[$this->camelCase($file)];
        }
    }

    public function camelCase($kebabCase) {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $kebabCase))));
    }

    public function lastCharacter($string, $character) {
        return substr($string, 0, strlen($string) - 1).str_replace($character, '', substr($string, -1));
    }
}

$web = new Web($system, $sharedRouter);
$template = $web->camelCase($web->currentQuery['template']);

require $web->webTemplateImport();
require '_core/web/web-head.php';
require '_core/web/web-body.php';

$web->web(
    $webHead->webHead(),
    $webBody->webBody(
        $webBodyHeader->webBodyHeader(),
        $webBodyNav->webBodyNav(),
        $webBodyMain->webBodyMain(
            $$template->$template()
        ),
        $webBodyFooter->webBodyFooter()
    )
);