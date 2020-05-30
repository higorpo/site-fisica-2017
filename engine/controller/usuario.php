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
     * M�todo respons�vel por realizar o login do usuario
     */

    public function doLogin(){
        // Criamos um novo usu�rio, baseado no modelo criado
        $this->usuarioModel = new usuarioModel();


        // Setamos os atributos usu�rio e senha com os dados vindos do formul�rio
        $this->usuarioModel->__set("username", $_POST["user"]);
        $this->usuarioModel->__set("password", $_POST["pass"]);


        // Chamamos o m�todo doLogin de usuarioDao. Esse m�todo retorna booleano por isso,
        // podemos us�-lo como condi��o no if.
        // Caso seja true, daremos um echo em true para que o javascript visualize esse retorno
        if($this->usuarioDao->doLogin($this->usuarioModel)){
            echo "true";
            return;
        }

        // Caso o m�todo doLogin retorne falso, daremos um echo false para retornar ao javascript.
        echo "false";
        return;
    }

    /**
     * @method getAllUsers
     * M�todo respons�vel por listar todos os usu�rios.
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
     * M�todo respons�vel por deletar um usu�rio
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
     * M�todo respons�vel por deletar um usu�rio
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