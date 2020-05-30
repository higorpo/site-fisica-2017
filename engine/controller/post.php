<?php

require_once "dao/postDao.php";
require_once "model/postModel.php";


Class Post{
    /**
     * @throws Exception
     * @var usuarioDao
     */
    private $postDao;

    /**
     * @throws Exception
     * @var usuarioModel
     */
    private $postModel;


    /**
     * @method __construct
     */
    public  function __construct(){
        //Instanciamos usuarioDao no construtor.
        $this->postDao = new PostDao();
    }

    /**
     * @method loadPost
     * Método responsável por carregar um post em específico.
     */

    public function loadPost(){
        // Criamos um novo usuário, baseado no modelo criado
        $this->postModel = new postModel();


        // Setamos os atributos usuário e senha com os dados vindos do formulário
        $this->postModel->__set("url", $_POST["url"]);


        // Chamamos o método doLogin de usuarioDao. Esse método retorna booleano por isso,
        // podemos usá-lo como condição no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->postDao->loadPost($this->postModel)){
            return;
        }

        // Caso o método doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }


    /**
     * @method createPost
     * Método responsável por criar um post.
     */

    public function createPost(){
        // Criamos um novo usuário, baseado no modelo criado
        $this->postModel = new postModel();


        // Setamos os atributos usuário e senha com os dados vindos do formulário
        $this->postModel->__set("title", $_POST["title"]);
        $this->postModel->__set("description", $_POST["description"]);
        $this->postModel->__set("createddate", $_POST["createddate"]);
        $this->postModel->__set("createdby", $_POST["createdby"]);
        $this->postModel->__set("content", $_POST["content"]);
        $this->postModel->__set("url", $_POST["url"]);
        $this->postModel->__set("search", $_POST["search"]);


        // Chamamos o método doLogin de usuarioDao. Esse método retorna booleano por isso,
        // podemos usá-lo como condição no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->postDao->createPost($this->postModel)){
            echo "true";
            return;
        }

        // Caso o método doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }

    /**
     * @method searchPost
     * Método responsável por procurar posts.
     */

    public function searchPost(){
        // Criamos um novo usuário, baseado no modelo criado
        $this->postModel = new postModel();


        // Setamos os atributos usuário e senha com os dados vindos do formulário
        $this->postModel->__set("title", $_POST["title"]);

        // Chamamos o método doLogin de usuarioDao. Esse método retorna booleano por isso,
        // podemos usá-lo como condição no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->postDao->searchPost($this->postModel)){

            return;
        }

        // Caso o método doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }

    /**
     * @method searchPost
     * Método responsável por procurar posts.
     */

    public function updatePost(){
        // Criamos um novo usuário, baseado no modelo criado
        $this->postModel = new postModel();


        // Setamos os atributos usuário e senha com os dados vindos do formulário
        $this->postModel->__set("title", $_POST["title"]);
        $this->postModel->__set("description", $_POST["description"]);
        $this->postModel->__set("content", $_POST["content"]);
        $this->postModel->__set("url", $_POST["url"]);

        // Chamamos o método doLogin de usuarioDao. Esse método retorna booleano por isso,
        // podemos usá-lo como condição no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->postDao->updatePost($this->postModel)){
            echo "true";
            return;
        }

        // Caso o método doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }

    /**
     * @method deletePost
     * Método responsável por procurar posts.
     */

    public function deletePost(){
        $this->postModel = new postModel();

        $this->postModel->__set("id", $_POST["id"]);

       if($this->postDao->deletePost($this->postModel)){
            echo "true";
            return;
        }

        echo "false";
        return;
    }

    /**
     * @method getAllPosts
     * Método responsável por listar todos os posts.
     */

    public function getMyPosts(){
        $this->postModel = new postModel();
        $this->postModel->__set("createdby", $_POST["createdby"]);

        if($this->postDao->getMyPosts($this->postModel)){
            return;
        }

        echo "false";
        return;
    }

    public function getAllPosts(){

        if($this->postDao->getAllPosts()){
            return;
        }

        echo "false";
        return;
    }

}