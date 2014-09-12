window.onerror = function(e){
	log(e);
}
window.objFace = {};

var Facebook = {
	urlAppFace : 'http://migre.me/efht7',
	urlApp : 'http://salvesocial.com/kimberly/cha-de-bebe/',
	myId : '',
	accessToken : 'AAACEdEose0cBAIKJDMDb8DEkOou7JuPd4HSxyLhEaRRvvTZCHUvIHqZA6NzZCdHtL690w9ZA9JjjxyYIZAG02jNN3HdZBP6nwNuMSV4q6ZCmKP9Rb0Ora7v',
	
	compartilheApp : function(e){
		//e.preventDefault();
		FB.ui({
			method: 'feed',
			link: Facebook.urlAppFace,
			picture: Facebook.urlApp + 'img/share.jpg',
			name: 'Ch� de Beb� - Huggies� Turma da M�nica�',
			caption: 'De Huggies Turma da M�nica',
			description: 'Chegou a hora de preparar o seu ch�! E a receita � simples: reunir quem voc� ama para comemorar a chegada do novo beb�. Conhe�a a nova ferramenta para criar um Ch� de Beb� delicioso.'
		}, function(response){
			log(response);
		});	
	},
	
	/**
	 *Tras os amigos do Facebook
	 */
	getFriends : function(callback){
		var that = this;
		if(window.objFace.friendList){
			if(typeof(callback) == 'function'){
				callback();
			}
		}
		
		that.getLoginStatus(function(){
			FB.api('/me/friends', 'get', {
				access_token: that.accessToken
			}, function(response) {
				window.objFace.friendList =  response.data;
				FaceEvent.addListenerSeach();
				FaceEvent.appendFriends();
				FaceEvent.setFriendInvited();
				if(typeof(callback) == 'function'){
					callback();
				}
			});
		});
	},
	
	getLoginStatus : function (callbackConnected){
		//		callbackConnected();
		//		return true;
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var authResponse = FB.getAuthResponse();
				Facebook.accessToken = authResponse.access_token;
				Facebook.myId = authResponse.userID;
				
				callbackConnected();
			} else {
				FB.login(function(response) {
					if (response.authResponse) {
						callbackConnected();
					}else{
						alert("Voc� deve aceitar o aplicativo para participar");
						window.location.reload();
					}
				}, {
					scope: 'user_about_me,email, user_events, friends_events, create_event, publish_stream, read_stream, publish_stream, friends_photos, user_photos,rsvp_event '
				});
			} 
		});
	}
	,
	
	/**
	 *Retorna os albums do usu�rio no face
	 *@param int albumId id do album, parametro passado pela fun��o getPhotos
	 **/
	getAlbumsPhotos : function(callback){
		var that = this;
		if(window.objFace.albums){
			callback();
			return;
		}
		
		that.getLoginStatus(function(){
			FB.api('/me/albums?fields=id,name,count,photos.limit(1).fields(source)', 'get', {}, function(response) {

				if(response.hasOwnProperty('data')){
					//SE N�O TER AUTORIZA��O DE PEGAR FOTOS
					if(response.data.length == 0){
						FB.login(function(response) {
							if (response.authResponse) {
								Facebook.getAlbumsPhotos(callback);
							}else{
								alert("Voc� deve aceitar o aplicativo para participar");
							}
						}, {
							scope: 'user_photos'
						});
						return;
					}
					
					window.objFace.albums = {};
					$.each(response.data, function(i, val){
						window.objFace.albums[val.id] = val;
					});
					
					if(typeof(callback) == 'function'){
						callback(response);
						return;
					}
				}else{
					log(response);
				}
			});
		});
	}
	,
	
	getPhotos : function(albumId, callback){
		var that = this;
				
		that.getLoginStatus(function(){
			FB.api(albumId +'/photos?fields=images,id', 'get', {}, function(response) {
				if(response.hasOwnProperty('data')){
					//SE N�O TER AUTORIZA��O DE PEGAR FOTOS
					if(response.data.length == 0){
						FB.login(function(response) {
							if (response.authResponse) {
								Facebook.getPhotos(callback);
							}else{
								alert("Voc� deve aceitar o aplicativo para participar");
							}
						}, {
							scope: 'user_photos'
						});
						return;
					}
					
					window.objFace.photos = {};
					$.each(response.data, function(i, val){
						window.objFace.photos[val.id] = val;
					});
					
					if(response.hasOwnProperty('paging')){
						if(response.paging.hasOwnProperty('next')){
							FB.api(response.paging.next, 'get', {}, function(response) {
								if(response.hasOwnProperty('data')){
									$.each(response.data, function(i, val){
										window.objFace.photos[val.id] = val;
									});
								}
							})
						}
					}
										
					if(typeof(callback) == 'function'){
						callback(response);
						return;
					}
				}else{
					log(response);
				}
			});
		});
	},
	
	/**
	 *Publicando o album com as fotos do ch� no facebook
	 **/
	deployAlbum :  function (){
		if($(this).hasClass('bt_aguarde')){
			return;
		}
		Loading.show();
		
		var postData = "classe=EventInvited&method=getInvitesJson";
		$.ajax({
			url: 'ajax.php',
			type: "POST",
			data: postData
		}).done(
			function(response){
				if(typeof(response) == 'string'){
					response = $.parseJSON(response);
				}
									
				var priv = {
					'value' : 'CUSTOM',
					'friends' : 'SOME_FRIENDS',
					'allow' : response.friends.join(',')
				};
				FB.login(function (response) {
					if (response.authResponse) {		
						FB.api('/me/albums/', 'post', {
							message:'As fotos do '+global.teaName+' ficaram muito legais! D� uma olhada e comente. ',
							name:'Ch� de beb�',
							privacy : priv
						}, function(response){
							Album.addIdAlbumFace(response.id);

							var $imgs = $('#listAlbumPhotoC img').not('.capaAl');
							
							var total = $imgs.length;
							$imgs.each(function(i, val){
								var filename = $(val).data('imgname');
								var imgURL = Facebook.urlApp + 'userfiles/fotos/t3_'+filename;
								FB.api(response.id + '/photos', 'post', {
									position: i,
									url:imgURL
								}, function(r){
									if(total <= (i + 1)){
										Loading.hide();
										$('.light-sucesso').fadeIn();
										Ga.trackAlbumCompartilheSuccess();
									}
								});
							});
						});

					} else {
						window.alert('Voc� deve aceitar o aplicativo.');
					}
				},{
					scope: 'publish_stream'
				});
			});
	},
	
	/**
	 *Envia um convite marcando os convidados
	 **/
	sendInviteFriends : function($friends){
		var imgURL = Facebook.urlApp +'userfiles/convites/'+global.eventFaceId+'.jpg';
		var aTags = [];
		var friends = [];
		
		var teaName = $('#nomecha');
		if(teaName.length){
			teaName = teaName.val();
		}else{
			teaName = global.teaName;
		}
		
		$.each($friends, function(i,val){
			var friendId = $(val).val();
			friends.push(friendId);
			aTags.push({
				x:"30",
				y: "30",
				tag_uid : friendId
			});
		});
			
		var priv = {
			'value' : 'CUSTOM',
			'friends' : 'SOME_FRIENDS',
			'allow' : friends.join(',')
		};
			
		FB.api('/me/albums/', 'post', {
			message:'',
			name:'convite',
			privacy : priv
		}, function(response){
			log(response)
			FB.api(response.id + '/photos', 'post', {
				message: teaName+'\n\
	Eba! Nosso beb� est� chegando e para comemorarmos preparamos um Ch� de Beb� inesquec�vel. Voc� n�o ficar de fora dessa festa.\n\
	Acesse o aplicativo Ch� de Beb� Huggies Turma da M�nica e participe da brincadeira. \n\
	'+Facebook.urlAppFace,
				url:imgURL,
				tags : aTags
			});
		});
	},
	
	/**
	 * Compartilha uma imagem avisando que o album est� pronto com um link do ch�
	 *  no facebook 
	 ***/
	shareMemoryBook : function(){
		Loading.show();
		var postData = "classe=EventInvited&method=getInvitesJson";
		var imgURL	= Facebook.urlApp + 'img/livrodememorias_gde_compartilhar.jpg';
		var aTags	= [];
		$.ajax({
			url: 'ajax.php',
			type: "POST",
			data: postData
		}).done(
			function(response){
				if(typeof(response) == 'string'){
					response = $.parseJSON(response);
				}
				$.each(response.friends, function(i,val){
					aTags.push({
						x:"30", 
						y: "30", 
						tag_uid : val
					});
				});
					
				var priv = {
					'value' : 'CUSTOM',
					'friends' : 'SOME_FRIENDS',
					'allow' : response.friends.join(',')
				};

				FB.api('/me/albums/', 'post', {
					name:'Album de mem�rias',
					privacy : priv
				}, function(response){
					FB.api(response.id + '/photos', 'post', {
						message: 'Olha que legal o Livro de Mem�rias com as curiosidades do ano em que o beb� nasceu para ele ver quando crescer. Esse presente foi criado com o aplicativo Ch� de Beb� Huggies Turma da M�nica. Fa�a o seu tamb�m.\n'+Facebook.urlAppFace,
						url: imgURL,
						tags : aTags
					}, function(response){
						Loading.hide();
						$('.light-share').fadeIn();
						Ga.trackLivroCompartilheSuccess();
					});
				});
			}
			);
	}
	
	
	
}
