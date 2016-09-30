<?php

class SharedRouter {
    public $sharedRouterConfig, $urlQueryArrr, $currentQueryArr = [];

    public function __construct(System $system) {
       $this->system = $system;
       $this->sharedRouterConfig = json_decode(file_get_contents('./_source/shared-router-config.json'), TRUE);
       $this->urlQueryArrr = explode("/", parse_url($this->system->url, PHP_URL_QUERY)); // array of queries
    }

    public function sharedRouter() {
        foreach($this->system->webSchema['webSchema'] as $schema) {
            $this->sharedRouterSearchQuery($schema);
            if (count($this->currentQueryArr) > 0) {
                return $this->currentQueryArr;
            }
        }

        // return 'home'/'not_found'
    }

    public function sharedRouterSearchQuery($schema) {
        for ($i = 0; $i <= min(count($this->currentQueryArr), count($this->urlQueryArrr) - 1); $i++) {
            switch($i) {
                case 0:
                    $this->sharedRouterSearchQueryKeyExists($i, $schema);
                    break;
                case 1:
                    $this->sharedRouterSearchQueryKeyExists($i, $schema[$this->currentQueryArr[0]['id']]['sub']);
                    break;
                case 2:
                    $this->sharedRouterSearchQueryKeyExists($i, $schema[$this->currentQueryArr[0]['id']]['sub'][$this->currentQueryArr[1]['id']]['sub']);
                    break;
            }
        }
    }

    public function sharedRouterSearchQueryKeyExists($i, $schema) {
        $search_query = $this->urlQueryArrr[$i];
        if (array_key_exists($search_query, $schema)) {
            array_push($this->currentQueryArr, $schema[$search_query]);
        }
    }

    public function sharedRouterBaseUrl() {
        return 'http://'.parse_url($this->system->url, PHP_URL_HOST).parse_url($this->system->url, PHP_URL_PATH);
    }
}

$sharedRouter = new SharedRouter($system);