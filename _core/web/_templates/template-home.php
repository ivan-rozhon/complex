<?php 

class TemplateHome {
    public $webBodyMain;

    public function __construct(WebBody $webBodyMain) {
        $this->webBodyMain = $webBodyMain;
    }

    public function templateHome() {
        return '
            templateHome
        ';
    }
}

$templateHome = new templateHome($webBodyMain);