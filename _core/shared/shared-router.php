<?php

class SharedRouter {
    public $sharedRouterConfig;

    public function __construct(System $system) {
       $this->system = $system;
       $this->sharedRouterConfig = json_decode(file_get_contents('./_source/shared-router-config.json'), TRUE);
    }

    public function sharedRouter() {        
        $url_query = explode("/",parse_url($this->system->url, PHP_URL_QUERY));
        // return count($url_query);
        return implode(" ",$url_query);
        // return parse_url($this->system->url, PHP_URL_HOST).parse_url($this->system->url, PHP_URL_PATH);
        // return $this->sharedRouterConfig['sharedRouterConfig']['mainSchema'];
    }

    public function sharedRouterSearchQuery() {

    }
}

$sharedRouter = new SharedRouter($system);