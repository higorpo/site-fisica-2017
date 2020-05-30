(function () {

	angular
		.module('app', 
			[
				'ngSanitize',
				'ngCookies',
				'ngAnimate',
				'ngAria',
				'ngMaterial',
				'ui.router'

			])

		.factory('userApi', userAPI)
		.factory('postApi', postAPI)
		.run(run)
		.config(config)
		.controller('mainController', mainController)
		.controller('indexController', indexController)
		.controller('loginController', loginController)
		.controller('postController', postController)
		.controller('createPostController', createPostController)
		.controller('membersPageController', membersPageController)
		.controller('articlesPageController', articlesPageController)
		.controller('articlesEditPageController', articlesEditPageController)
		.controller('userProfileSettingsController', userProfileSettingsController)
		.controller('logoutController', logoutController);

		function userAPI($http, $cookies, $q, $rootScope) {
	        var Base64 = {
	     
	            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	     
	            encode: function (input) {
	                var output = "";
	                var chr1, chr2, chr3 = "";
	                var enc1, enc2, enc3, enc4 = "";
	                var i = 0;
	     
	                do {
	                    chr1 = input.charCodeAt(i++);
	                    chr2 = input.charCodeAt(i++);
	                    chr3 = input.charCodeAt(i++);
	     
	                    enc1 = chr1 >> 2;
	                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                    enc4 = chr3 & 63;
	     
	                    if (isNaN(chr2)) {
	                        enc3 = enc4 = 64;
	                    } else if (isNaN(chr3)) {
	                        enc4 = 64;
	                    }
	     
	                    output = output +
	                        this.keyStr.charAt(enc1) +
	                        this.keyStr.charAt(enc2) +
	                        this.keyStr.charAt(enc3) +
	                        this.keyStr.charAt(enc4);
	                    chr1 = chr2 = chr3 = "";
	                    enc1 = enc2 = enc3 = enc4 = "";
	                } while (i < input.length);
	     
	                return output;
	            },
	     
	            decode: function (input) {
	                var output = "";
	                var chr1, chr2, chr3 = "";
	                var enc1, enc2, enc3, enc4 = "";
	                var i = 0;
	     
	                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	                var base64test = /[^A-Za-z0-9\+\/\=]/g;
	                if (base64test.exec(input)) {
	                    window.alert("There were invalid base64 characters in the input text.\n" +
	                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
	                        "Expect errors in decoding.");
	                }
	                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	     
	                do {
	                    enc1 = this.keyStr.indexOf(input.charAt(i++));
	                    enc2 = this.keyStr.indexOf(input.charAt(i++));
	                    enc3 = this.keyStr.indexOf(input.charAt(i++));
	                    enc4 = this.keyStr.indexOf(input.charAt(i++));
	     
	                    chr1 = (enc1 << 2) | (enc2 >> 4);
	                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                    chr3 = ((enc3 & 3) << 6) | enc4;
	     
	                    output = output + String.fromCharCode(chr1);
	     
	                    if (enc3 != 64) {
	                        output = output + String.fromCharCode(chr2);
	                    }
	                    if (enc4 != 64) {
	                        output = output + String.fromCharCode(chr3);
	                    }
	     
	                    chr1 = chr2 = chr3 = "";
	                    enc1 = enc2 = enc3 = enc4 = "";
	     
	                } while (i < input.length);
	     
	                return output;
	            }
	        };

			var service = {
				userLogin 	     : userLogin,
				SetCredentials 	 : SetCredentials,
				ClearCredentials : ClearCredentials,
				isLogged         : isLogged,
				userName 		 : userName,
				getAllUsers		 : getAllUsers,
				deleteUser       : deleteUser,
				createUser		 : createUser,
				getUserSettings  : getUserSettings,
				saveUserSetttings: saveUserSetttings,
				getUserFullName  : getUserFullName,
				userFullName 	 : userFullName
			}

			return service;
			

			function isLogged() {
				var cookieExists = $cookies.getObject("globals");
				if(cookieExists != undefined) {
					return true;
				}
				return false;
			}

			function userName() {
				var name = $cookies.getObject("globals");
				return name.currentUser.username;
			}

			function userFullName() {
				var name = $cookies.getObject("globals");
				return name.currentUser.fullUserName;
			}

			function getUserFullName(user) {
				var deffered = $q.defer();

				var data = {
					username: user
				}
				$http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/getUserFullName", data).then(function (data) {
	                if(data.data === "false") {
	                	deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data.fullname);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function getUserSettings(user) {
				var deffered = $q.defer();
				var data = {
					username: user
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/getUserSettings", data).then(function (data) {
	                if(data.data === "false") {
	                	deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function saveUserSetttings(fullname, shortdescription) {
				var deffered = $q.defer();
				var user = userName();
				var data = {
					username: user,
					fullname: fullname,
					shortdescription: shortdescription
				}

				console.log(data.shortdescription);
	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/saveUserSetttings", data).then(function (data) {

	                if(data.data === "true") {
	                    deffered.resolve();
	                }
	                else if(data.data === "false") {

	                    deffered.reject();
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });
	            return deffered.promise;

			}


			function userLogin(username, password) {
				var deffered = $q.defer();
				var data = {
					user: username,
					pass: password
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/doLogin", data).then(function (data) {

	                if(data.data === "true") {
	                    deffered.resolve();
	                }
	                else if(data.data === "false") {

	                    deffered.reject();
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
	        }

	        function SetCredentials(username, password, fullUserName) {
	            var authdata = Base64.encode(username + ':' + password);
	 
	            $rootScope.globals = {
	                currentUser: {
	                    username: username,
	                    authdata: authdata,
	                    fullUserName: fullUserName
	                }
	            };
	 
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
	 
	            var cookieExp = new Date();
	            cookieExp.setDate(cookieExp.getDate() + 7);
	            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
	        }

	        function ClearCredentials() {
	            $rootScope.globals = {};
	            $cookies.remove('globals');
	            $http.defaults.headers.common.Authorization = 'Basic';
	        }

			function getAllUsers() {
				var deffered = $q.defer();

	            $http.get("http://localhost/_fisica/Website/engine/api.php/?path=usuario/getAllUsers").then(function (data) {

	                if(data.data === "false") {
	                	deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function createUser(username, password, fullname) {
				var deffered = $q.defer();
				var data = {
					username: username,
					password: password,
					fullname: fullname
				}
	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/createUser", data).then(function (data) {

	            	if(data.data === "true") {
	            		deffered.resolve();
	            	}
	                else if(data.data === "false") {
	                	deffered.reject();
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function deleteUser(userID) {
				var deffered = $q.defer();
				var data = {
					id: userID
				}
	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=usuario/deleteUser", data).then(function (data) {

	            	if(data.data === "true") {
	            		deffered.resolve();
	            	}
	                else if(data.data === "false") {
	                	deffered.reject();
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}
		}

		function postAPI($http, $q) {

			var service = {
				loadPost 	: loadPost,
				createPost  : createPost,
				searchPost  : searchPost,
				updatePost	: updatePost,
				getAllPosts : getAllPosts,
				getMyPosts  : getMyPosts,
				deletePost  : deletePost
			}
				
			return service;

			function loadPost(url) {
				var deffered = $q.defer();
				var data = {
					url: url
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/loadPost", data).then(function (data) {

	                if(data.data === "false") {

	                    deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function searchPost(postTitle) {
				var deffered = $q.defer();
				var data = {
					title: postTitle
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/searchPost", data).then(function (data) {

	                if(data.data === "false") {

	                    deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}


			function createPost(title, description, createdby, createddate, content, url) {
				var deffered = $q.defer();
				var data = {
					title: title,
					description: description,
					createddate: createddate,
					createdby : createdby,
					content: content,
					url: url,
					search: undefined
				}

				var mapaAcentosHex 	= {
					a : /[\xE0-\xE6]/g,
					e : /[\xE8-\xEB]/g,
					i : /[\xEC-\xEF]/g,
					o : /[\xF2-\xF6]/g,
					u : /[\xF9-\xFC]/g,
					c : /\xE7/g,
					n : /\xF1/g
				};

				for ( var letra in mapaAcentosHex ) {
					var expressaoRegular = mapaAcentosHex[letra];
					title = title.replace( expressaoRegular, letra );
				};

				data.search = title.toLowerCase();
	            console.log(data.search);
	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/createPost", data).then(function (data) {

	            	if(data.data === "true") {
	            		deffered.resolve();
	            	}
	                if(data.data === "false") {

	                    deffered.reject();
	                }
	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function updatePost(title, description, content, url) {
				var deffered = $q.defer();
				var data = {
					title: title,
					description: description,
					content: content,
					url: url
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/updatePost", data).then(function (data) {

	                if(data.data === "false") {
	            	console.log("teste 1");

	                    deffered.reject();
	                }
	                else if(data.data === "true") {
	         	            	console.log("teste 2");

	                	deffered.resolve();
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function getMyPosts(createdby) {
				var deffered = $q.defer();

				var data = {
					createdby: createdby
				}

	            $http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/getMyPosts", data).then(function (data) {

	                if(data.data === "false") {
	                	deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}

			function getAllPosts() {
				var deffered = $q.defer();

	            $http.get("http://localhost/_fisica/Website/engine/api.php/?path=post/getAllPosts").then(function (data) {

	                if(data.data === "false") {
	                	deffered.reject();
	                }
	                else {
	                	deffered.resolve(data.data);
	                }

	            }, function () {
	                console.error("HTTP Erro ao tentar capturar informações do usuário.");
	            });

	            return deffered.promise;
			}
			function deletePost(postID) {
				var deffered = $q.defer();
				var data = {
					id: postID
				}

				$http.post("http://localhost/_fisica/Website/engine/api.php/?path=post/deletePost", data).then(function (data) {
					if(data.data === "true") {
						deffered.resolve(data.data);
					}
					else if(data.data === "false") {
						deffered.reject();
					}
				});
				return deffered.promise;
			}
		}

		function run($rootScope, $location, userApi) {
			$rootScope.$on('$locationChangeStart', function (event, next, current) {
			    var loggedIn = userApi.isLogged();
			    if (($location.path() === "/login") && loggedIn) {
			        $location.path('/');
			    }
			    else if(($location.path() === "/criarArtigo") || ($location.path() === "/membros") || ($location.path() === "/editarArtigo") || ($location.path() === "/meusArtigos") && !loggedIn) {
			    	$location.path("/");
			    }
			});
		}

		function config($stateProvider, $mdThemingProvider) {



			$mdThemingProvider.theme('default')
			    .primaryPalette('green');

			$stateProvider.state('indexPage', {
				url		: '/',
				views   : {
					'main@': {
						templateUrl: 'views/index.html',
						controller : 'indexController as vm' 
					}
				}
			});

			$stateProvider.state('loginPage', {
				url		: '/login',
				views   : {
					'main@': {
						templateUrl: 'views/login-and-register.html',
						controller : 'loginController as vm' 
					}
				}
			});

			$stateProvider.state('postPage', {
				url		: '/artigo/:post',
				views   : {
					'main@': {
						templateUrl: 'views/viewPost.html',
						controller : 'postController as vm' 
					}
				}
			});

			$stateProvider.state('createPostPage', {
				url		: '/criarArtigo/',
				views   : {
					'main@': {
						templateUrl: 'views/createPost.html',
						controller : 'createPostController as vm' 
					}
				}
			});

			$stateProvider.state('membersPage', {
				url		: '/membros/',
				views   : {
					'main@': {
						templateUrl: 'views/members.html',
						controller : 'membersPageController as vm' 
					}
				}
			});

			$stateProvider.state('articlesPage', {
				url		: '/meusArtigos',
				views   : {
					'main@': {
						templateUrl: 'views/myarticles.html',
						controller : 'articlesPageController as vm' 
					}
				}
			});

			$stateProvider.state('editPostPage', {
				url		: '/editarArtigo/:post',
				views   : {
					'main@': {
						templateUrl: 'views/editArticle.html',
						controller : 'articlesEditPageController as vm' 
					}
				}
			});

			$stateProvider.state('userSettingsPage', {
				url		: '/eu',
				views   : {
					'main@': {
						templateUrl: 'views/editProfile.html',
						controller : 'userProfileSettingsController as vm' 
					}
				}
			});


			$stateProvider.state('logoutPage', {
				url		: '/sair',
				views   : {
					'main@': {
						templateUrl: 'views/logout.html',
						controller : 'logoutController as vm' 
					}
				}
			});

		}

		function mainController($scope) {

		}

		function indexController($scope, userApi, postApi) {
			$scope.userLogged = userApi.isLogged();
			$scope.results = [];

			angular.element(document).bind('keydown', function (event) {
				if(event.which === 13) {
					$scope.search($scope.search.input);
				}
				else if(event.which === 27) {
					if($scope.search.showResults === true) {
						$scope.search.showResults = false;
						$scope.$digest();
					}
				}
			});

			$scope.search = function (search) {

				if(search.length > 0) {

					var mapaAcentosHex 	= {
						a : /[\xE0-\xE6]/g,
						e : /[\xE8-\xEB]/g,
						i : /[\xEC-\xEF]/g,
						o : /[\xF2-\xF6]/g,
						u : /[\xF9-\xFC]/g,
						c : /\xE7/g,
						n : /\xF1/g
					};

					for ( var letra in mapaAcentosHex ) {
						var expressaoRegular = mapaAcentosHex[letra];
						search = search.replace( expressaoRegular, letra );
					};

					search = search.toLowerCase();
					postApi.searchPost(search).then(function (data) {
						$scope.nothing = false;

						for(var i = 0; i < data.length; i++) {
							resultData = {};							
							resultData.title = data[i].title;
							resultData.author = data[i].createdby;
							resultData.date = data[i].createddate;
							resultData.description = data[i].description;
							resultData.url = data[i].url;

							$scope.results.push(resultData);
						}
					}, function () {
						$scope.nothing = true;
					});
					$scope.search.showResults = true;
					$scope.results = [];
				}

			}
		}

		function loginController($scope, userApi, $location, $mdToast) {
			$scope.buttonLogin = function (user, pass) {
				userApi.userLogin(user, pass).then(function () {
					userApi.getUserFullName(user).then(function (data) {
						userApi.SetCredentials(user, pass, data);
						userApi.isLogged();
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('Logado com sucesso, seja bem-vindo!')
					        .position("bottom right")
					        .hideDelay(3000)
					    );

						setTimeout(function() {
							$location.path('/');
						}, 3500);
					});
					
				}, function () {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Usuário ou senha inválidos!')
				        .position("bottom right")
				        .hideDelay(3000)
				    );
				});
			}
		}

		function postController($mdToast, $location, postApi, userApi, $scope, $sce, $http, $stateParams, $mdToast) {
			$scope.userLogged = userApi.isLogged();

			var classificated = false;
			var postURL = $stateParams.post;

			angular.element(document).bind('keydown', function (event) {
				if(event.which === 27) {
					if($scope.stateReferenceArticle === true) {
						$scope.stateReferenceArticle = false;
						$scope.$digest();
					}
				}
			});

			$scope.trustAsHtml = function(string) {
			    return $sce.trustAsHtml(string);
			};

			$scope.openReferenceArticle = function () {
				$scope.stateReferenceArticle = true;
			};

			$scope.closeReferenceArticle = function () {
				$scope.stateReferenceArticle = false;
			}

			$scope.postDelete = function(postID) {
				console.log(postID);
				postApi.deletePost(postID).then(function () {
					alert("Post deletado com sucesso!");
					$location.path("/");
				}, function () {
					alert("Parece que estamos com problemas técnicos, tente novamente mais tarde!");
				});
			}

			postApi.loadPost(postURL).then(function (data) {
				$scope.postData = {
					id: data.id,
					title: data.title,
					author: data.createdby,
					date: data.createddate,
					description: data.description,
					conteudo: data.content,
					url: data.url
				}

				var res = $scope.postData.author.split(" ");
				var sobrenome = res[res.length - 1];
				var nome = res[0];

				$scope.postData.referenceName = sobrenome.toUpperCase() + ", " + nome;
				$scope.postData.referenceSite = location.href;

				var d = new Date();
				var day = d.getDate();
				var month = new Array();
				month[0] = "janeiro";
				month[1] = "fevereiro";
				month[2] = "março";
				month[3] = "abril";
				month[4] = "maio";
				month[5] = "junho";
				month[6] = "julho";
				month[7] = "agosto";
				month[8] = "setembro";
				month[9] = "outubro";
				month[10] = "novembro";
				month[11] = "dezembro";
				var year = d.getFullYear();

				$scope.postData.referenceDay = day;
				$scope.postData.referenceMonth = month[d.getMonth()];
				$scope.postData.referenceYear = year;

			}, function () {
				$location.path("/");
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('Esse artigo não existe, tente novamente mais tarde!')
			        .position("bottom right")
			        .hideDelay(3000)
			    );		
			});



		 	$scope.setClassification = function (classification) {

				if(classificated == true) {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Você já deu sua classificação nesta seção!')
				        .position("bottom right")
				        .hideDelay(3000)
				    );				
				}	
				else {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Classificação adicionada com sucesso!')
				        .position("bottom right")
				        .hideDelay(3000)
				    );
				}

			    if(classification == 0 && classificated == false) {
			    	//deslike
			    	angular.element(document.querySelector("#dislike")).addClass("dislike");
			    }
			    else if(classification == 1 && classificated == false) {
			    	//like
			    	angular.element(document.querySelector("#like")).addClass("like");
			    }

			    classificated = true;
		 	}
		}

		function createPostController($location, postApi, userApi, $scope, $mdToast, $rootScope) {
			$scope.userLogged = userApi.isLogged();

			$scope.saveArticle = function (title, description) {
				var conteudo = angular.element(document.querySelector("#editor")).froalaEditor('html.get');

				if(title != null && title.length < 6 || title.length > 50) {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Certifique-se de colocar um título com no máximo 50 caracteres.')
				        .position("bottom right")
				        .hideDelay(3000)
				    );	
				}
				else if(description != null && description.length < 30 || description.length > 150) {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Certifique-se de colocar uma descrição entre 30 e 150 caracteres.')
				        .position("bottom right")
				        .hideDelay(3000)
				    );	
				}
				else if(conteudo.length < 30) {
					$mdToast.show(
				      $mdToast.simple()
				        .textContent('Certifique-se de criar um conteúdo com no mínimo 30 caracteres.')
				        .position("bottom right")
				        .hideDelay(3000)
				    );	
				}
				else {
					if(userApi.isLogged() === false) {
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('Somente pessoas autorizadas podem publicar um artigo!')
					        .position("bottom right")
					        .hideDelay(3000)
					    );	
					}
					else {
						var dateObj = new Date();
						var month = dateObj.getMonth() + 1; //months from 1-12
						var day = dateObj.getDate();
						var year = dateObj.getFullYear();

						newdate = day + "/" + month + "/" + year;

						function standardizeText(texto) {
							specialCharacters = /!|,|:|\?|\.|\`|\´|\~|\^|\°|\/|\\|\<|\>|;|\||\ª|\º|\[|\]|\(|\)|\{|\}|\@|\#|\$|\%|\¨|\*|\_|\-|\+|\=|\"|\'|\&/g; 
							texto = texto.replace(specialCharacters, "");

							var mapaAcentosHex 	= {
								a : /[\xE0-\xE6]/g,
								e : /[\xE8-\xEB]/g,
								i : /[\xEC-\xEF]/g,
								o : /[\xF2-\xF6]/g,
								u : /[\xF9-\xFC]/g,
								c : /\xE7/g,
								n : /\xF1/g
							};

							for ( var letra in mapaAcentosHex ) {
								var expressaoRegular = mapaAcentosHex[letra];
								texto = texto.replace( expressaoRegular, letra );
							};

							for(var i = 0; i < texto.length; i++) {
								texto = texto.replace(" ", "-");
							}

							texto = texto.replace("--", "-").replace("---", "-").replace("----", "-");
							return texto.toLowerCase();
						}

						var url =  standardizeText(title);
						postApi.createPost(title, description, userApi.userFullName(), newdate, conteudo, url).then(function () {
							$scope.disabledActions = true;

							$mdToast.show(
						      $mdToast.simple()
						        .textContent('Artigo publicado. Aguarde enquanto carregamos a página!')
						        .position("bottom right")
						        .hideDelay(3000)
						    );	

							setTimeout(function () {
								var url = "/artigo/" + standardizeText(title);
								console.log(url);
								$location.path(url);
							}, 4000);
						}, function () {
							$mdToast.show(
						      $mdToast.simple()
						        .textContent('Não conseguimos criar o seu artigo, tente novamente mais tarde. Certifique-se de não estar criando um artigo com o mesmo título de outro!')
						        .position("bottom right")
						        .hideDelay(3000)
						    );	
						});

					}
				}
			}

			angular.element(document.querySelector("#editor")).froalaEditor({
			  	toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'specialCharacters', 'insetHR', 'selectAll', 'clearFormatting', '|', 'html', '|', 'undo', 'redo'],
			  	language: 'pt_br'
			});


		}

		function membersPageController(userApi, $scope) {
			$scope.userLogged = userApi.isLogged();
			$scope.users = [];


			$scope.createUser = function (username, password, fullname) {
				if(username != null && password != null && fullname != null && username.length > 0 && password.length > 0 && fullname.length > 0) {
					userApi.createUser(username, password, fullname).then(function () {
						alert("Usuário criado com sucesso!");
						location.reload();
					}, function () {
						alert("Tivemos um problema na hora de criar o usuário, tente novamente mais tarde!");
					});
				}
			}

			$scope.deleteUser = function (userID) {
				userApi.deleteUser(userID).then(function () {

					alert('Usuário deletado com sucesso, aguarde!');
					location.reload();   
				}, function () {
					alert("Erro ao tentar deletar o usuário, tente novamente mais tarde!");
				});
				
			}

			userApi.getAllUsers().then(function (data) {

				for(var i = 0; i < data.length; i++) {
					resultData = {};
					resultData.id = data[i].id;
					resultData.username = data[i].username;
					resultData.fullname = data[i].fullname;
					resultData.shortdescription = data[i].shortdescription;

					$scope.users.push(resultData);
				}			
			}, function () {
				$location.path("/");
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('Parece que tivemos algum problema técnico, tente novamente mais tarde!')
			        .position("bottom right")
			        .hideDelay(3000)
			    );	
			});
		}

		function articlesPageController(postApi, userApi, $scope) {
			$scope.userLogged = userApi.isLogged();
			$scope.posts = [];

			$scope.postDelete = function(postID) {
				postApi.deletePost(postID).then(function () {
					alert("Post deletado com sucesso!");
					location.reload();
				}, function () {
					alert("Parece que estamos com problemas técnicos, tente novamente mais tarde!");
				});
			}

			postApi.getMyPosts(userApi.userFullName()).then(function (data) {
				console.log(data);
				for(var i = 0; i < data.length; i++) {
					resultData = {};
					resultData.id = data[i].id;
					resultData.title = data[i].title;
					resultData.description = data[i].description;
					resultData.createddate = data[i].createddate;
					resultData.url = data[i].url;

					$scope.posts.push(resultData);
				}	
			});
		}

		function articlesEditPageController(postApi, userApi, $scope, $stateParams, $location, $mdToast) {
			$scope.userLogged = userApi.isLogged();
			$scope.articleURL = $stateParams.post;
			$scope.postData = {};

			$scope.saveArticle = function (title, description) {
				var conteudo = angular.element(document.querySelector("#editor")).froalaEditor('html.get');
				postApi.updatePost(title, description, conteudo, $scope.articleURL).then(function () {
					alert("Artigo editado com sucesso!");

				}, function () {
					alert("Parece que estamos com problemas técnicos, tente novamente mais tarde!");
				});
			}

			postApi.loadPost($scope.articleURL).then(function (data) {
				$scope.postData = {
					title: data.title,
					description: data.description,
					conteudo: data.content
				}
				angular.element(document.querySelector("#editor")).froalaEditor('html.set', $scope.postData.conteudo);

			}, function () {
				$location.path("/");
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('Esse artigo não existe, crie este artigo clicando em "criar artigo" no menu!')
			        .position("bottom right")
			        .hideDelay(3000)
			    );		
			});

			angular.element(document.querySelector("#editor")).froalaEditor({
			  	toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'specialCharacters', 'insetHR', 'selectAll', 'clearFormatting', '|', 'html', '|', 'undo', 'redo'],
			  	language: 'pt_br'
			});

		}
		function userProfileSettingsController($scope, userApi) {
			$scope.userLogged = userApi.isLogged();
			$scope.userData = {};

			$scope.saveSettings = function (fullname, description) {
				userApi.saveUserSetttings(fullname, description).then(function () {
					alert("Alterações salvas com sucesso!");
				}, function () {
					alert("Parece que estamos com problemas técnicos, tente novamente mais tarde!");
				});
			}

			var username = userApi.userName();
			userApi.getUserSettings(username).then(function (data) {
				$scope.userData = {
					username: username,
					fullname: data.fullname,
					shortdescription: data.shortdescription
				};
			});
		}
		function logoutController(userApi) {
			userApi.ClearCredentials();
		}
})();
