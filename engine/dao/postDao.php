<?php

require_once "core/database.php";

Class PostDao{
    /**
     * @var $pdo
     */
    private static $db;

    public function __construct(){
        self::$db = Database::getInstance();
    }

    public function loadPost(postModel $post){
        try {
            $stmt = self::$db->prepare('SELECT * FROM `post` WHERE `url`=:url');

            //BINDING VALUES
            $url = $post->__get("url");

            $stmt->bindValue(':url', $url, SQLITE3_TEXT);

            $result = $stmt->execute();

            $row = $result->fetchArray(SQLITE3_ASSOC);
                
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

    public function createPost(postModel $post){
        try {
            $stmt = self::$db->prepare('INSERT INTO `post` (`title`, `description`, `createddate`, `createdby`, `content`, `url`, `search`) VALUES (:title, :description, :createddate, :createdby, :content, :url, :search)');

            //BINDING VALUES
            $title = $post->__get("title");
            $description = $post->__get("description");
            $createddate = $post->__get("createddate");
            $createdby = $post->__get("createdby");
            $content = $post->__get("content");
            $url = $post->__get("url");
            $search = $post->__get("search");

            $stmt->bindValue(':title', $title, SQLITE3_TEXT);
            $stmt->bindValue(':description', $description, SQLITE3_TEXT);
            $stmt->bindValue(':createddate', $createddate, SQLITE3_TEXT);
            $stmt->bindValue(':createdby', $createdby, SQLITE3_TEXT);
            $stmt->bindValue(':content', $content, SQLITE3_TEXT);
            $stmt->bindValue(':url', $url, SQLITE3_TEXT);
            $stmt->bindValue(':search', $search, SQLITE3_TEXT);


            if($stmt->execute()){
                return true; // RETURN TO FINISH EXECUTION IN THIS POINT
            }

            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function searchPost(postModel $post){
        try {
            $stmt = self::$db->prepare('SELECT `title`, `createddate`, `createdby`, `description`, `url` FROM `post` WHERE `search` LIKE :title');

            //BINDING VALUES
            $title = $post->__get("title");

            $stmt->bindValue(':title', "%".$title."%", SQLITE3_TEXT);


            $result = $stmt->execute();

            $row = array(); 
            $i = 0; 

            while($res = $result->fetchArray(SQLITE3_ASSOC)){ 

                if(!isset($res['title'])) continue; 

                $row[$i]['title'] = $res['title']; 
                $row[$i]['createddate'] = $res['createddate']; 
                $row[$i]['createdby'] = $res['createdby']; 
                $row[$i]['description'] = $res['description']; 
                $row[$i]['url'] = $res['url']; 
                $i++; 

            } 


            if($result->fetchArray(SQLITE3_ASSOC) != false) {
                echo json_encode($row);
                return true;
            }
            return false;

        }
        catch (Exception $e){
            throw new Exception("We had an error: " . $e->getMessage(), 1);
        }
    }

    public function updatePost(postModel $post){
        try {

            $stmt = self::$db->prepare('UPDATE `post` SET `title` = :title, `description` = :description, `content`= :content WHERE `url`=:url');

            //BINDING VALUES
            $title = $post->__get("title");
            $description = $post->__get("description");
            $content = $post->__get("content");
            $url = $post->__get("url");

            $stmt->bindValue(':title', $title, SQLITE3_TEXT);
            $stmt->bindValue(':description', $description, SQLITE3_TEXT);
            $stmt->bindValue(':content', $content, SQLITE3_TEXT);
            $stmt->bindValue(':url', $url, SQLITE3_TEXT);

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

    public function deletePost(postModel $post){
        try {

            $stmt = self::$db->prepare('DELETE FROM `post` WHERE `id` = :id');

            //BINDING VALUES
            $id = $post->__get("id");

            $stmt->bindValue(':id', $id, SQLITE3_TEXT);

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
    public function getMyPosts(postModel $post){
        try {

            $stmt = self::$db->prepare('SELECT `id`, `title`, `description`, `createddate`, `url` FROM `post` WHERE `createdby` = :createdby');

            //BINDING VALUES
            $createdby = $post->__get("createdby");
            $stmt->bindValue(':createdby', $createdby, SQLITE3_TEXT);

            $results = $stmt->execute();

            $row = array(); 
            $i = 0; 

            while($res = $results->fetchArray(SQLITE3_ASSOC)){ 

                if(!isset($res['id'])) continue; 

                $row[$i]['id'] = $res['id']; 
                $row[$i]['title'] = $res['title']; 
                $row[$i]['description'] = $res['description']; 
                $row[$i]['createddate'] = $res['createddate']; 
                $row[$i]['url'] = $res['url']; 
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

    public function getAllPosts(){
        try {
            $results = self::$db->query('SELECT `id`, `title`, `description`, `createddate`, `url` FROM `post`');
            
            $row = array(); 
            $i = 0; 

            while($res = $results->fetchArray(SQLITE3_ASSOC)){ 

                if(!isset($res['id'])) continue; 

                $row[$i]['id'] = $res['id']; 
                $row[$i]['title'] = $res['title']; 
                $row[$i]['description'] = $res['description']; 
                $row[$i]['createddate'] = $res['createddate']; 
                $row[$i]['url'] = $res['url']; 
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
}