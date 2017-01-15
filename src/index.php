<?php

// system
class System {
    public $url, $pathPrefix;

    public function __construct(){
        $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        // set path prefix
        $this->pathPrefix = __DIR__.'/';
    }

    public static function autoload($class) {
        // camelCase -> kebab-case
        $class = strtolower(ucfirst(preg_replace('/((?<=[^$])[A-Z0-9]+)/', '-$1', $class)));
        require $class.'.php';
    }
}

$system = new System;

// autoloading classes
set_include_path(
    implode(
        PATH_SEPARATOR,
        array(
            get_include_path(),
            $system->pathPrefix.'_core/admin/',
            $system->pathPrefix.'_core/api/',
            $system->pathPrefix.'_core/shared/',
            $system->pathPrefix.'_core/web/'
        )
    )
);
spl_autoload_register(array('System', 'autoload'));

// shared
$sharedJWT = new SharedJWT();
$sharedRouter = new SharedRouter($system);
$sharedTemplateProvider = new SharedTemplateProvider($system);
require $system->pathPrefix.$sharedRouter->sharedRouter();