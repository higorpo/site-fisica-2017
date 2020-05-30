<?php
//error_reporting(0);
//ini_set(“display_errors”, 0 );

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}

$path = isset($_GET["path"]) ? explode("/", trim($_GET["path"])) : [];

$controller = "usuario";
$metodo = "index";

if(isset($path[0]) && file_exists("controller/" . $path[0] . ".php")){
    $controller = $path[0];
    unset($path[0]);
}

require_once "controller/" . $controller . ".php";
$controller = new $controller;

if(isset($path[1]) && method_exists($controller, $path[1])){
    $metodo = $path[1];
    unset($path[1]);
}

$controller->$metodo();