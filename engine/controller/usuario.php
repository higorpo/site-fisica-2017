<?php

require_once "dao/usuarioDao.php";
require_once "model/usuarioModel.php";


Class Usuario{
    /**
     * @throws Exception
     * @var usuarioDao
     */
    private $usuarioDao;

    /**
     * @throws Exception
     * @var usuarioModel
     */
    private $usuarioModel;


    /**
     * @method __construct
     */
    public  function __construct(){
        //Instanciamos usuarioDao no construtor.
        $this->usuarioDao = new UsuarioDao();
    }

    /**
     * @method doLogin
     * Método responsável por realizar o login do usuario
     */

    public function doLogin(){
        // Criamos um novo usuário, baseado no modelo criado
        $this->usuarioModel = new usuarioModel();


        // Setamos os atributos usuário e senha com os dados vindos do formulário
        $this->usuarioModel->__set("username", $_POST["user"]);
        $this->usuarioModel->__set("password", $_POST["pass"]);


        // Chamamos o método doLogin de usuarioDao. Esse método retorna booleano por isso,
        // podemos usá-lo como condição no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->usuarioDao->doLogin($this->usuarioModel)){
            echo "true";
            return;
        }

        // Caso o método doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }

    /**
     * @method getAllUsers
     * Método responsável por listar todos os usuários.
     */

    public function getAllUsers(){

        if($this->usuarioDao->getAllUsers()){
            return;
        }

        echo "false";
        return;
    }

    public function getUserFullName(){
        $this->usuarioModel = new usuarioModel();

        $this->usuarioModel->__set("username", $_POST["username"]);

        if($this->usuarioDao->getUserFullName($this->usuarioModel)){
            return;
        }

        echo "false";
        return;
    }


    /**
     * @method deleteUSer
     * Método responsável por deletar um usuário
     */

    public function deleteUSer(){
        $this->usuarioModel = new usuarioModel();


        $this->usuarioModel->__set("userID", $_POST["id"]);


        if($this->usuarioDao->deleteUSer($this->usuarioModel)){
            echo "true";
            return;
        }

        echo "false";
        return;
    }

    /**
     * @method createUSer
     * Método responsável por deletar um usuário
     */

    public function createUSer(){
        $this->usuarioModel = new usuarioModel();

        $this->usuarioModel->__set("username", $_POST["username"]);
        $this->usuarioModel->__set("password", $_POST["password"]);
        $this->usuarioModel->__set("fullname", $_POST["fullname"]);


        if($this->usuarioDao->createUSer($this->usuarioModel)){
            echo "true";
            return;
        }

        echo "false";
        return;
    }

    /**
     * @method getUserSettings
     */

    public function getUserSettings(){
        $this->usuarioModel = new usuarioModel();

        $this->usuarioModel->__set("username", $_POST["username"]);

        if($this->usuarioDao->getUserSettings($this->usuarioModel)){
            return;
        }

        echo "false";
        return;
    }

    /**
     * @method saveUserSetttings
     */

    public function saveUserSetttings(){
        $this->usuarioModel = new usuarioModel();

        $this->usuarioModel->__set("username", $_POST["username"]);
        $this->usuarioModel->__set("fullname", $_POST["fullname"]);
        $this->usuarioModel->__set("shortdescription", $_POST["shortdescription"]);

        if($this->usuarioDao->saveUserSetttings($this->usuarioModel)){
            echo "true";
            return;
        }

        echo "false";
        return;
    }

}