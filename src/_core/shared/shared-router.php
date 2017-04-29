<?php

class SharedRouter {
    public $sharedRouterConfig, $urlQueryArr, $currentQueryArr;

    public function __construct(System $system) {
        $this->system = $system;
        // decode shared-router-config.json
        $this->sharedRouterConfig = json_decode(file_get_contents('_source/shared-router-config.json'), TRUE)['sharedRouterConfig'];
        // check & save if code run on localhost & prettyUrl are enabled
        $this->prettyUrl = $this->strposa("http://$_SERVER[HTTP_HOST]", ['localhost', '127.0.0.1']) ? false : $this->sharedRouterConfig['prettyUrl'];
        // array of url queries
        $this->urlQueryArr = $this->prettyUrl ? explode('/', trim(str_replace('/?', '', $_SERVER['REQUEST_URI']), '/')) : explode('/', parse_url($this->system->url, PHP_URL_QUERY));
    }

    public function sharedRouter() {
        // search for query exceptions (admin, api)
        if (in_array($this->urlQueryArr[0], $this->sharedRouterConfig['queryExceptions'])) {
            return '_core/'.$this->urlQueryArr[0].'/'.$this->urlQueryArr[0].'.php';
        }
        // default route (web)
        return '_core/'.$this->sharedRouterConfig['defaultRoute'].'/'.$this->sharedRouterConfig['defaultRoute'].'.php';
    }

    public function currentQuery($schema, $schemaConfig) {
        // initial current query array (empty)
        $this->currentQueryArr = [];

        // compare and search for queries in web-schema
        foreach($schema as $subSchema) {

            $this->searchQuery($subSchema);

            if (count($this->currentQueryArr) > 0) {

                // abstract state
                $this->abstractState($schema, $schemaConfig, $this->currentQueryArr);

                return $this->currentQueryArr;
            }
        }

        $this->mainQuery($schema, $schemaConfig);
        return $this->currentQueryArr;
    }

    public function searchQuery($subSchema) {
        for ($i = 0; $i <= min(count($this->currentQueryArr), count($this->urlQueryArr) - 1); $i++) {
            switch($i) {
                case 0:
                    $this->queryKeyExists($i, $subSchema);
                    break;
                case 1:
                    $queryIndex = $this->findIndex($subSchema, 'id', $this->currentQueryArr[0]['id']);

                    $this->queryKeyExists($i, $subSchema[$queryIndex]['sub']);
                    break;
                case 2:
                    $queryIndex = $this->findIndex($subSchema, 'id', $this->currentQueryArr[0]['id']);
                    $querySubIndex = $this->findIndex($subSchema[$queryIndex]['sub'], 'id', $this->currentQueryArr[1]['id']);

                    $this->queryKeyExists($i, $subSchema[$queryIndex]['sub'][$querySubIndex]['sub']);
                    break;
            }
        }
    }

    private function queryKeyExists($i, $subSchema) {
        $search_query = $this->urlQueryArr[$i];

        $queryIndex = $this->findIndex($subSchema, 'id', $search_query);
        if ($queryIndex !== -1) {
            array_push($this->currentQueryArr, $subSchema[$queryIndex]);
        }
    }

    private function mainQuery($schema, $schemaConfig) {
        $queryIndex = $this->findIndex($schema[$schemaConfig['mainSchema']], 'id', $schemaConfig['mainQuery']);
        array_push($this->currentQueryArr, $schema
            [
                $schemaConfig['mainSchema']
            ][
                $queryIndex !== -1 ? $queryIndex : 0
            ]
        );
    }

    public function findIndex($array, $innerKey, $innerValue) {
        $index = -1;
        foreach($array as $key => $value) {
            if ($value[$innerKey] === $innerValue) {
                $index = $key;
            }
        }
        return $index;
    }

    public function abstractState($schema, $schemaConfig, $currentQueryArr) {
        if (count($currentQueryArr) == 1 && array_key_exists('abstract', $currentQueryArr[0])) {
            switch($currentQueryArr[0]['abstract']) {
                case 'parent':
                    $this->currentQueryArr = [];
                    $this->mainQuery($schema, $schemaConfig);
                    break;
                case 'child':
                    if (count($this->currentQueryArr[0]['sub']) > 0) {
                        $queryIndex = $this->findIndex($this->currentQueryArr[0]['sub'], 'id', reset($this->currentQueryArr[0]['sub'])['id']);
                        $this->currentQueryArr = [$this->currentQueryArr[0], $this->currentQueryArr[0]['sub'][$queryIndex]];
                    }
                    break;
            }
        }
    }

    // strpos() for array of strings
    // http://stackoverflow.com/questions/6284553/using-an-array-as-needles-in-strpos
    function strposa($haystack, $needle, $offset=0) {
        if(!is_array($needle)) $needle = array($needle);
        foreach($needle as $query) {
            if(strpos($haystack, $query, $offset) !== false) return true; // stop on first true result
        }
        return false;
    }

    // base path of app
    public function basePath() {
        return $this->prettyUrl ? "http://$_SERVER[HTTP_HOST]/" : parse_url($this->system->url, PHP_URL_PATH).'?';
    }

    // base url of app
    public function baseUrl() {
        // get URI
        $REQUEST_URI = $_SERVER['REQUEST_URI'];
        // find query position
        $queryPosition = strrpos($REQUEST_URI,'/?');
        // cut query (/?...)
        $path = $queryPosition || $queryPosition === 0 ? substr($REQUEST_URI, 0, $queryPosition) : substr($REQUEST_URI, 0, strrpos($REQUEST_URI,'/'));

        return $this->prettyUrl ? 'http://'.$_SERVER['HTTP_HOST'].'/' : 'http://'.$_SERVER['HTTP_HOST'].$path.'/';
    }
}