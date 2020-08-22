<?php

class ApiWebDemo {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiWebDemo() {
        // demo data
        $data = [['city' => 'Prague'], ['city' => 'Brno'], ['city' => 'Liberec']];

        // response
        echo json_encode($data);
    }
}