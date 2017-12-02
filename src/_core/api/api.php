<?php

class Api {
    const SECRET = 'secret-complex-admin-key';

    public $system, $sharedJWT, $requestMethod;

    public function __construct(System $system, SharedJWT $sharedJWT) {
        $this->system = $system;
        $this->sharedJWT = $sharedJWT;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->queryString = $_SERVER['QUERY_STRING'];
        $this->apiUsers = json_decode(file_get_contents('_source/api-users.json'), TRUE);
        assert_options(ASSERT_ACTIVE, 1);
        assert_options(ASSERT_WARNING, 0);
        assert_options(ASSERT_BAIL, 1);
        assert_options(ASSERT_QUIET_EVAL, 1);
        assert_options(ASSERT_CALLBACK, function($file, $line, $code, $status) {
            // set the error response code (assertion code)
            http_response_code($this->$status[0]);
            // compose data response
            echo $this->dataResponse(null, null, false, $this->$status[1], 'error');
        });
    }

    public function api(
        // POST
        $apiLogin, $apiSchemaSave, $apiDataUpdate, $apiDataNew, $apiDataSave, $apiMediaSave,
        // GET
        $apiSchemaLoad, $apiDataLoad, $apiWebDemo
        ) {

        switch($this->requestMethod) {
            case 'POST':
                $this->apiPOST($apiLogin, $apiSchemaSave, $apiDataUpdate, $apiDataNew, $apiDataSave, $apiMediaSave);
                break;
            case 'GET':
                $this->apiGET($apiSchemaLoad, $apiDataLoad, $apiWebDemo);
                break;
        }
    }

    // main data response method (composing data response)
    public function dataResponse($data, $token, $success, $messageText = '', $messageType = 'info') {
        return json_encode([
            'data' => $data,
            'token' => $token,
            'success' => $success,
            'message' => [
                'text' => $messageText,
                'type' => $messageType
            ]
        ]);
    }

    // POST requests
    public function apiPOST($apiLogin, $apiSchemaSave, $apiDataUpdate, $apiDataNew, $apiDataSave, $apiMediaSave) {
        // incoming post arguments
        $post = json_decode(file_get_contents('php://input'), true);

        // explode query string to array of strings
        $queryStringArr = explode('/', $this->queryString);

        // get the path from query string
        $path = array_key_exists(1, $queryStringArr) ? $queryStringArr[1] : '';

        // get the after path params
        $pathParams = count($queryStringArr) > 2 ? array_slice($queryStringArr, 2) : [];

        switch($path) {
            // Login authentication
            case 'login':
                $apiLogin->apiLogin($post);
                break;

            // Save schema
            case 'schemaSave':
                $apiSchemaSave->apiSchemaSave($post);
                break;

            // Update data model
            case 'dataUpdate':
                $apiDataUpdate->apiDataUpdate($post);
                break;

            // create new data model
            case 'dataNew':
                $apiDataNew->apiDataNew($post);
                break;

            // save data model
            case 'dataSave':
                $apiDataSave->apiDataSave($post);
                break;

            // save media (images/gallery)
            case 'mediaSave':
                $apiMediaSave->apiMediaSave($post, $pathParams);
        }
    }

    // GET requests
    public function apiGET($apiSchemaLoad, $apiDataLoad, $apiWebDemo) {
        switch($this->queryString) {
            // load web schema
            case 'schemaLoad':
                $apiSchemaLoad->apiSchemaLoad();
                break;

            // load data model
            case 'dataLoad':
                $apiDataLoad->apiDataLoad();
                break;

            // demo API for web (*.js)
            case 'es6':
                $apiWebDemo->apiWebDemo();
                break;
        }
    }

    // find exact item in schema (by data) and change template
    public function findAndChangeItem($schema, $dataKey, $template) {
        foreach($schema as $key => $value) {
            if ($schema[$key]['data'] === $dataKey) {
                $schema[$key]['template'] = $template;
            }
            if (array_key_exists('sub', $schema[$key]) && count($schema[$key]['sub']) > 0) {
                $schema[$key]['sub'] = $this->findAndChangeItem($schema[$key]['sub'], $dataKey, $template);
            }
        }
        return $schema;
    }

    // create authorization token
    public function createToken($id, $user) {
        $token_payload = [
            'id' => $id,
            'user' => $user,
            'exp' => time() + 3600
        ];
        return SharedJWT::encode($token_payload, self::SECRET);
    }

    // verify incoming authorization token
    public function verifyToken($decodedJWT) {
        // Error status
        $this->assertStatus = [401, 'Invalid token'];

        // find user index in api-users.json
        $userIndex = $this->findIndex($this->apiUsers['apiUsers'], 'i', $decodedJWT->{'id'});
        assert($userIndex !== -1, 'assertStatus');

        // verify username
        assert(password_verify($decodedJWT->{'user'}, $this->apiUsers['apiUsers'][$userIndex]['u']), 'assertStatus');
        // check expiration time
        assert($decodedJWT->{'exp'} > time(), 'assertStatus');
    }

    // decode incoming token
    public function decodeToken($headers) {
        // first uppercase letter fix
        $key = array_key_exists('authorization', $headers) ? 'authorization' : 'Authorization';

        // explode authorization header
        $authorization = explode(' ', $headers[$key]);

        // check Bearer header
        $this->assertStatus = [401, 'Invalid header'];
        assert($authorization[0] === 'Bearer', 'assertStatus');

        // decode incoming token
        return SharedJWT::decode($authorization[1], self::SECRET);
    }

    // find specific index in array
    public function findIndex($array, $innerKey, $innerValue) {
        $index = -1;
        foreach($array as $key => $value) {
            if ($value[$innerKey] === $innerValue) {
                $index = $key;
            }
        }
        return $index;
    }

    // find specific hashed index in array
    public function findHashIndex($array, $innerKey, $innerValue) {
        $index = -1;
        foreach($array as $key => $value) {
            if (password_verify($innerValue, $value[$innerKey])) {
                $index = $key;
            }
        }
        return $index;
    }

    // generate new (unique) data key
    public function newDataKey() {
        $alpha = "abcdefghijklmnopqrstuvwxyz";
        $alphaUpper = strtoupper($alpha);
        $numeric = "0123456789";
        $chars = "";

        $chars = $alpha.$alphaUpper.$numeric;
        $length = 10;

        $len = strlen($chars);
        $pw = '';
        $randomString = '';

        while (ctype_alpha($randomString) || !preg_match('/[A-Z]/', $randomString) || !preg_match('/[a-z]/', $randomString)) {
            $pw = '';
            for ($i=0; $i<$length; $i++) {
                $pw .= substr($chars, rand(0, $len-1), 1);
            }
            $randomString = str_shuffle($pw);
        }

        return $randomString.'-'.time();
    }
}

$api = new Api($system, $sharedJWT);

// POST
$apiLogin = new ApiLogin($api);
$apiSchemaSave = new ApiSchemaSave($api);
$apiDataUpdate = new ApiDataUpdate($api);
$apiDataNew = new ApiDataNew($api);
$apiDataSave = new ApiDataSave($api);
$apiMediaSave = new ApiMediaSave($api);

// GET
$apiSchemaLoad = new ApiSchemaLoad($api);
$apiDataLoad = new ApiDataLoad($api);
$apiWebDemo = new ApiWebDemo($api);

$api->api(
    // POST
    $apiLogin,
    $apiSchemaSave,
    $apiDataUpdate,
    $apiDataNew,
    $apiDataSave,
    $apiMediaSave,
    // GET
    $apiSchemaLoad,
    $apiDataLoad,
    $apiWebDemo
);