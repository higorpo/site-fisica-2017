<?php
Class usuarioModel{

    /**
     * @var $userID
     */
    private $userID;

    /**
     * @var $nick
     */
    private $username;

    /**
     * @var $pass
     */
    private $password;

    /**
     * @var $fullname
     */
    private $fullname;

    /**
     * @var $shortdescription
     */
    private $shortdescription;

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