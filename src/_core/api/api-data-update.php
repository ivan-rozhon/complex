<?php

/** Used to update template and content (if already created) on page - currently is not used */
class ApiDataUpdate {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiDataUpdate($post) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);

        // request arguments
        $dataKey = $post['data'];
        $template = $post['template'];
        $schemaKey = $post['key'];

        // check if data/template/key exists
        $this->api->assertStatus = [400, 'No data'];
        assert($data !== 'null', 'assertStatus');
        assert($template !== 'null', 'assertStatus');
        assert($key !== 'null', 'assertStatus');

        // Load current schema and requested template
        $schema = json_decode(file_get_contents('_source/web-schema.json'), TRUE);
        $templatePrototype = json_decode(file_get_contents('_core/web/templates/'.$template.'.json'), TRUE);

        // backup if put fail
        $schemaBackup = $schema;
        $dataBackup = file_get_contents('_source/data/'.$dataKey.'.json');

        // find item in schema and change template
        $schema['webSchema'][$schemaKey] = $this->api->findAndChangeItem($schema['webSchema'][$schemaKey], $dataKey, $template);

        // update schema
        $schemaSuccess = file_put_contents('_source/web-schema.json', json_encode($schema)) === FALSE ? FALSE : TRUE;
        // change data model
        $dataSuccess = file_put_contents('_source/data/'.$dataKey.'.json', json_encode($templatePrototype['_metadata']['prototype'])) === FALSE ? FALSE : TRUE;

        // check if putting was successful
        $success = $schemaSuccess && $dataSuccess ? true : false;

        // apply backup if file_put_contents() failed
        if (!$success) {
            file_put_contents('_source/web-schema.json', json_encode($schemaBackup));
            file_put_contents('_source/data/'.$dataKey.'.json', $dataBackup);
        }

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // response data object
        $data = array('token' => $token, 'success' => $success);

        // successful response
        echo json_encode($data);
    }
}