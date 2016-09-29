<?php

class SharedRouter {
    public $sharedRouterConfig, $url_query_arr;

    public function __construct(System $system) {
       $this->system = $system;
       $this->sharedRouterConfig = json_decode(file_get_contents('./_source/shared-router-config.json'), TRUE);
       $this->url_query_arr = explode("/", parse_url($this->system->url, PHP_URL_QUERY)); // array of queries
    }

    public function sharedRouter() {
        // return count($this->url_query_arr);
        // return $this->url_query_arr[0];
        return implode(" ", $this->url_query_arr);
        // return $this->sharedRouterConfig['sharedRouterConfig']['mainSchema'];
        
        // TO DO: querySchema, depth, queryObject

        foreach($this->system->webSchema['webSchema'] as $schema) {
            // $this->sharedRouterSearchQuery($schema);
            foreach($schema as $query) {
                
            }
        }
    }

    public function sharedRouterSearchQuery() {
        
    }

    public function sharedRouterBaseUrl() {
        return 'http://'.parse_url($this->system->url, PHP_URL_HOST).parse_url($this->system->url, PHP_URL_PATH);
    }
}

$sharedRouter = new SharedRouter($system);