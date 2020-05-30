<?php

Class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('database.db');
    }
}


Class Database{


    /**
     * @var $pdo
     */
    private static $instance;


    public static function getInstance(){
        if(!self::$instance){
            if(!file_exists("database.db")) {
                self::$instance = new MyDB();
                self::$instance->exec("CREATE TABLE `post`( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `title` TEXT NOT NULL, `description` TEXT NOT NULL, `createddate` TEXT NOT NULL, `createdby` TEXT NOT NULL, `content` TEXT NOT NULL, `likes` INTEGER DEFAULT 0, `dislikes` INTEGER DEFAULT 0, `url` TEXT NOT NULL UNIQUE)");
                self::$instance->exec("CREATE TABLE `users`( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `username` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL, `fullname` TEXT NOT NULL, `shortdescription` TEXT NOT NULL)");
            }
            else {
                self::$instance = new MyDB();
            }
        }
        return self::$instance;
    }

}