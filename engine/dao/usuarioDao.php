<?php

require_once "core/database.php";

Class UsuarioDao{
    /**
     * @var $pdo
     */
    private static $db;

    public function __construct(){
        self::$db = Database::getInstance();
    }

    public function save(usuarioModel $usuario){
        //TODO: implement logic to persist usuario in database;
    }

    public function listUsuario(){
        //TODO: implement logic to list usuario from database;
    }

    public function update(usuarioModel $usuario){
        //TODO: implement logic to update usuario in database
    }

    public function delete($id){
        //TODO: implement logic to delete usuario from database;
    }

    public function doLogin(usuarioModel $usuario){
        try {
            $stmt = self::$db->prepare('SELECT `id` FROM `users` WHERE `username`=:user AND `password`=:pass');

            //BINDING VALUES
            $user = $usuario->__get("username");
            $pass = $usuario->__get("password");

            $stmt->bindValue(':user', $user, SQLITE3_TEXT);
            $stmt->bindValue(':pass', $pass, SQLITE3_TEXT);

            $result = $stmt->execute();
            $row = $result->fetchArray(SQLITE3_ASSOC);

            if($row != false){
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function getAllUsers(){
        try {
            $results = self::$db->query('SELECT `id`, `username`, `fullname`, `shortdescription` FROM `users`');
            

            $row = array(); 
            $i = 0; 

            while($res = $results->fetchArray(SQLITE3_ASSOC)){ 

                if(!isset($res['id'])) continue; 

                $row[$i]['id'] = $res['id']; 
                $row[$i]['username'] = $res['username']; 
                $row[$i]['fullname'] = $res['fullname']; 
                $row[$i]['shortdescription'] = $res['shortdescription']; 
                $i++; 

            } 


            if($results->fetchArray(SQLITE3_ASSOC) != false) {
                echo json_encode($row);
                return true;
            }
            return false;
        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function deleteUser(usuarioModel $usuario){
        try {

            $stmt = self::$db->prepare('DELETE FROM `users` WHERE `id` = :id');

            //BINDING VALUES
            $userID = $usuario->__get("userID");

            $stmt->bindValue(':id', $userID, SQLITE3_TEXT);

            $result = $stmt->execute();


            if(self::$db->changes() > 0){
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;
        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function createUser(usuarioModel $usuario){
        try {
            $stmt = self::$db->prepare('INSERT INTO `users` (`username`, `password`, `fullname`) VALUES (:username, :password, :fullname)');

            //BINDING VALUES
            $username = $usuario->__get("username");
            $password = $usuario->__get("password");
            $fullname = $usuario->__get("fullname");

            $stmt->bindValue(':username', $username, SQLITE3_TEXT);
            $stmt->bindValue(':password', $password, SQLITE3_TEXT);
            $stmt->bindValue(':fullname', $fullname, SQLITE3_TEXT);


            if($stmt->execute()){
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function getUserFullName(usuarioModel $usuario){
        try {

            $stmt = self::$db->prepare('SELECT `fullname` FROM `users` WHERE `username`=:username');

            //BINDING VALUES
            $username = $usuario->__get("username");

            $stmt->bindValue(':username', $username, SQLITE3_TEXT);
  
            $row = array(); 
            $i = 0; 

            $results = $stmt->execute();
            $row = $results->fetchArray(SQLITE3_ASSOC);
                
            if($row != false){
                echo json_encode($row);
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function getUserSettings(usuarioModel $usuario){
        try {

            $stmt = self::$db->prepare('SELECT `fullname`, `shortdescription` FROM `users` WHERE `username`=:username');

            //BINDING VALUES
            $username = $usuario->__get("username");

            $stmt->bindValue(':username', $username, SQLITE3_TEXT);
  
            $row = array(); 
            $i = 0; 

            $results = $stmt->execute();
            $row = $results->fetchArray(SQLITE3_ASSOC);
                
            if($row != false){
                echo json_encode($row);
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }
    public function saveUserSetttings(usuarioModel $usuario){
        try {

            $stmt = self::$db->prepare('UPDATE `users` SET `fullname` = :fullname, `shortdescription` = :shortdescription WHERE `username`=:username');

            //BINDING VALUES
            $fullname = $usuario->__get("fullname");
            $shortdescription = $usuario->__get("shortdescription");
            $username = $usuario->__get("username");

            $stmt->bindValue(':fullname', $fullname, SQLITE3_TEXT);
            $stmt->bindValue(':username', $username, SQLITE3_TEXT);
            $stmt->bindValue(':shortdescription', $shortdescription, SQLITE3_TEXT);


            $result = $stmt->execute();


            if(self::$db->changes() > 0){
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;
        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

}