<?php

class SharedRouter {
    public $sharedRouterConfig, $urlQueryArr, $currentQueryArr;

    public function __construct(System $system) {
        $this->system = $system;
        $this->sharedRouterConfig = json_decode(file_get_contents('_source/shared-router-config.json'), TRUE)['sharedRouterConfig'];
        $this->urlQueryArr = explode("/", parse_url($this->system->url, PHP_URL_QUERY)); // array of queries
    }

    public function sharedRouter() {
        if (in_array($this->urlQueryArr[0], $this->sharedRouterConfig['queryExceptions'])) {
            return '_core/'.$this->urlQueryArr[0].'/'.$this->urlQueryArr[0].'.php';
        }
        return '_core/'.$this->sharedRouterConfig['defaultRoute'].'/'.$this->sharedRouterConfig['defaultRoute'].'.php';
    }

    public function sharedRouterCurrentQuery($schema, $schemaConfig) {
        $this->currentQueryArr = [];
        foreach($schema as $subSchema) {
            $this->sharedRouterSearchQuery($subSchema);
            if (count($this->currentQueryArr) > 0) {

                // abstract state
                $this->sharedRouterAbstractState($schema, $schemaConfig, $this->currentQueryArr);

                return $this->currentQueryArr;
            }
        }
        
        $this->sharedRouterMainQuery($schema, $schemaConfig);
        return $this->currentQueryArr;
    }

    public function sharedRouterSearchQuery($subSchema) {
        for ($i = 0; $i <= min(count($this->currentQueryArr), count($this->urlQueryArr) - 1); $i++) {
            switch($i) {
                case 0:
                    $this->sharedRouterQueryKeyExists($i, $subSchema);
                    break;
                case 1:
                    $this->sharedRouterQueryKeyExists($i, $subSchema[$this->currentQueryArr[0]['id']]['sub']);
                    break;
                case 2:
                    $this->sharedRouterQueryKeyExists($i, $subSchema[$this->currentQueryArr[0]['id']]['sub'][$this->currentQueryArr[1]['id']]['sub']);
                    break;
            }
        }
    }

    private function sharedRouterQueryKeyExists($i, $subSchema) {
        $search_query = $this->urlQueryArr[$i];
        if (array_key_exists($search_query, $subSchema)) {
            array_push($this->currentQueryArr, $subSchema[$search_query]);
        }
    }

    private function sharedRouterMainQuery($schema, $schemaConfig) {
        array_push($this->currentQueryArr, $schema
            [
                $schemaConfig['mainSchema']
            ][
                $schemaConfig['mainQuery']
            ]
        );
    }

    public function sharedRouterAbstractState($schema, $schemaConfig, $currentQueryArr) {
        if (count($currentQueryArr) == 1 && array_key_exists('abstract', $currentQueryArr[0])) {
            switch($currentQueryArr[0]['abstract']) {
                case 'parent':
                    $this->currentQueryArr = [];
                    $this->sharedRouterMainQuery($schema, $schemaConfig);
                    break;
                case 'child':
                    $this->currentQueryArr = [$this->currentQueryArr[0], $this->currentQueryArr[0]['sub'][reset($this->currentQueryArr[0]['sub'])['id']]];
                    break;
            }
        }
    }

    public function sharedRouterBaseUrl() {
        return 'http://'.parse_url($this->system->url, PHP_URL_HOST).parse_url($this->system->url, PHP_URL_PATH);
    }
}