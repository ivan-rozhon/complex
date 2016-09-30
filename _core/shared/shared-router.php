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
        // return implode(" ", $this->url_query_arr);
        // return $this->sharedRouterConfig['sharedRouterConfig']['mainSchema'];
        // return $this->sharedRouterConfig['sharedRouterConfig']['mainSchema']['home']['template'];
        // return $this->system->webSchema['webSchema']['webSchemaMain']['home']['template'];
        // TO DO: querySchema, depth, queryObject

        foreach($this->system->webSchema['webSchema'] as $schema) {
            return $this->sharedRouterSearchQuery($schema);

            // if (array_key_exists($this->url_query_arr[0], $schema)) {
            //     return $this->url_query_arr[0];
            // }
        }
    }

    public function sharedRouterSearchQuery($schema) {
        // vrátit array queryies (za sebou jdoucích parent-> child), nebo vrátit 'home'/'nenalezeno'
    }

    public function sharedRouterBaseUrl() {
        return 'http://'.parse_url($this->system->url, PHP_URL_HOST).parse_url($this->system->url, PHP_URL_PATH);
    }
}

$sharedRouter = new SharedRouter($system);