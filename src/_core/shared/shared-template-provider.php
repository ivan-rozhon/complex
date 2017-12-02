<?php

class SharedTemplateProvider {

    public function __construct(System $system) {
        $this->system = $system;
    }

    public function sharedTemplateProvider($varArr, $templatePath) {
        // get html template
        $template = file_exists($this->system->pathPrefix.$templatePath) ? file_get_contents($this->system->pathPrefix.$templatePath) : 'file "'.$templatePath.'" not found!';

        // search for [[variables]]
        while (strpos($template, '[[') && strpos($template, ']]')) {
            // start and end of [[variable]]
            $firstPos = strpos($template, '[[');
            $lastPos = strpos($template, ']]');

            // return current [[variable]]
            $substitute = substr($template, $firstPos, $lastPos - $firstPos + 2);

            // trim '[[' & ']]' characters
            $varName = substr($substitute, 2, strlen($substitute) - 4);

            // replace [[variable]] in template / empty string
            $template = isset($varArr[$varName]) ?
                str_replace($substitute, $varArr[$varName], $template) :
                str_replace($substitute, '', $template);
        }

        return $template;
    }
}