<?php
Class postModel{

    private $id;
    private $title;
    private $description;
    private $createddate;
    private $createdby;
    private $content;
    private $url;
    private $search;

    public function __set($name = null, $value = null){
        if(property_exists($this, $name)){
            $this->$name = $value;
            return;
        }
        throw new Exception("Property doesn't exists.", 1);

    }

    public function __get($name){
        return $this->$name;
    }

}