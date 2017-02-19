<?php

class Web {
    public $system, $sharedRouter, $webSchema, $webConfig, $currentQueryArr, $currentQuery;

    public function __construct(System $system, SharedRouter $sharedRouter, SharedTemplateProvider $sharedTemplateProvider) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->templateProvider = $sharedTemplateProvider;
        $this->webSchema = json_decode(file_get_contents('_source/web-schema.json'), TRUE)['webSchema'];
        $this->webConfig = json_decode(file_get_contents('_source/web-config.json'), TRUE)['webConfig'];
        $this->currentQueryArr = $this->sharedRouter->currentQuery($this->webSchema, $this->webConfig);
        $this->currentQuery = $this->currentQueryArr[count($this->currentQueryArr) - 1];
        $this->templateData = $this->webTemplateData($this->currentQuery['data']);
    }

    public function web($webHead, $webBody) {
        $lang = $this->webConfig['lang'];
        echo $this->templateProvider->sharedTemplateProvider(
                [
                    'lang' => $lang,
                    'webHead' => $webHead,
                    'webBody' => $webBody
                ],
                '_core/web/web.html'
            );
    }

    public function webTemplateImport() {
        return '_core/web/templates/'.$this->currentQuery['template'].'.php';
    }

    public function webTemplateData($file) {
        if (file_exists('_source/data/'.$file.'.json')) {
            return json_decode(file_get_contents('_source/data/'.$file.'.json'), TRUE);
        }
    }

    public function camelCase($kebabCase) {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $kebabCase))));
    }

    public function lastCharacter($string, $character) {
        return substr($string, 0, strlen($string) - 1).str_replace($character, '', substr($string, -1));
    }
}

$web = new Web($system, $sharedRouter, $sharedTemplateProvider);
$template = $web->camelCase($web->currentQuery['template']);

// template import
require $web->webTemplateImport();

$webHead = new WebHead($web);
$webBody = new WebBody($web);
$webBodyHeader = new WebBodyHeader($webBody);
$webBodyNav = new WebBodyNav($webBody, $sharedRouter);
$webBodyMain = new WebBodyMain($webBody);
$webBodyFooter = new WebBodyFooter($webBody);

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