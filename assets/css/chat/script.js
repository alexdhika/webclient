$('#chat-container').hide();
$('#login-container').hide();

const cc = 'webchat@domain.com';
const server = "http://localhost:3000/api/";
var height = 0;

(function() {
	if (typeof(Storage) !== "undefined") {

		var ccToken = getSession('ccId',function(x){
			return x;
		});
		var cToken = getSession('cId',function(y){
			return y;
		});
		var lastChat = 0;

		if(ccToken && cToken){
			getAllChats();
			setInterval(function(){
				getAllChats(true);
				$('#loading').html("");
				//scroll_to();
			},2000);
			$('div.chat-history div.chat-message').each(function(i, value){
			    height += parseInt($(this).height());
				scroll_to();
			});
		}

		function scroll_to(){
			$('.chat-history').animate({scrollTop: height});
		}

		function getAllChats(last){
			if(last){
				last = '/' + lastChat;
			}else{
				last = '/{date}';
			}
			var pushUrl = ccToken + '/' + cToken + last;
			var message = '';
			var from = '';

			$.ajax({
				url : server + 'CrmInteractions/findChats/' + pushUrl,
				method : 'GET',
				success : function(s){
					 /*console.log(s.data);*/
					var y = s.data;
					var gravatar = ""
					for(var i=y.length - 1; i >= 0; i--){
						if(y[i].type === 'inbox'){
							from = "me";
							gravatar = "views/images/client.png";
						}else{
							from = "CS1";
							gravatar = "views/images/cs.jpeg";
						}
						message = y[i].content;
						lastChat = y[i].created;

						var html = '<div class="chat-message clearfix" id="'+lastChat+'"> \
										<img src="'+ gravatar +'" alt="" width="32" height="32"> \
										<div class="chat-message-content clearfix"> \
											<span class="chat-time">13:35</span> \
											<h5>'+ from +'</h5> \
											<p>'+ message +'</p> \
										</div> <!-- end chat-message-content --> \
									</div> <!-- end chat-message --> \
									<hr>';
						$('.chat-history').append(html);
						//height += parseInt($(this).height());
					}
				},
				error : function(e){
					return cb(true, null); /*error*/
				}
			})
		}


	    /*Code for localStorage/sessionStorage.*/
	    function getSession(key, cb){
	    	if(key === 'name')
	    		var sess = (localStorage.name)?localStorage.name:null;
	    	else if(key === 'ccId')
	    		var sess = (localStorage.ccId)?localStorage.ccId:null;
	    	else if(key === 'cId')
	    		var sess = (localStorage.cId)?localStorage.cId:null;
	    	else
	    		var sess = (localStorage.email)?localStorage.email:null;
	    	return cb(sess);
	    }

	    function setSession(data, cb){
	    	$.each(data,function(x, y){
	    		localStorage.setItem(x,y);
	    	});
//	    	return cb(null,true);
	    }

	    function getCCId(x, cb){
	    	$.ajax({
	    		url : server + "ContactCenters/findByVal/" + x,
				method : 'GET',
				success : function(s){
					return cb(null, s.data);
				},
				error : function(e){
					return cb(true, null); /*error*/
				}	
			}).done(function(r){
				return true;/*success*/
			});
	    }

	    function getCustId(x, cb){
	    	$.ajax({
	    		url : server + "CrmContacts/findByVal/" + x,
				method : 'GET',
				success : function(s){
					return cb(null, s.data);
				},
				error : function(e){
					return cb(true, null); /*error*/
				}	
			}).done(function(r){
				return true;/*success*/
			});
	    }

	    /*form*/
	    $('#submit-button').click(function(e){
	    	e.preventDefault();
	    	var name = $('#name').val();
	    	var email = $('#email').val();
	    	if(name && email){
	    		getCCId(cc, function(e, r){
	    			var ccId = r.id;
	    			var sess = {'name':name,'email':email,'ccId':ccId};
		    		if(e)alert("salah configurasi");
	    			getCustId(email, function(x, y){
		    			if(y.id){
		    				sess.cId = y.id;
		    			}
			    		setSession(sess,function(e,r){
			    			if(r){
			    				$('#login-container').hide();
								$('#chat-container').show();
			    			}
			    		});
	    			});
	    		});
	    	}
	    });

	    $('#textmessage').on('keyup',function(e){
	    	e.preventDefault();
	    	var message = $('#textmessage');
	    	if(event.which == 13 && message.val().length > 0) 
        		sendMessage(message.val(), function(e, y){
        			if(y){
        				message.val('');
        			}
        		});
	    });

	    function sendMessage(m, cb){
	    	getSession('email', function(x){
	    		if(x){
	    			var pushUrl = cc + '/' + x;
	    			var data = {};
	    			data.online = true;
	    			data.content = m;
	    			$.ajax({
	    				url : server + "CrmInteractions/sms-receive/" + pushUrl,
	    				method : 'POST',
	    				dataType : 'json',
	    				data : data,
	    				success : function(s){
	    					if(s.contactId){
		    					getSession('cId', function(d){
		    						if(d <= 0){
		    							setSession({'cId':s.contactId});
		    						}
		    					});
		    					/*console.log(s);*/
	    					}
	    				},
	    				error : function(e){
	    					/*console.log(e);*/
	    					return cb(true, null); /*error*/
	    				}	
	    			}).done(function(){
	    				$('#loading').html("sending...");
	    				return cb(null, true);/*success*/
	    			});
	    		}
	    	});
	    }

	    function getChat(){
	    	getSession('email', function(x){
	    		$.ajax({
    				url : "http://localhost:3000/api/CrmInteractions/sms-receivead/" + pushUrl,
    				method : 'POST',
    				dataType : 'json',
    				data : data,
    				success : function(s){
    					/*console.log(s);*/
    				},
    				error : function(e){
    					/*console.log(e);*/
    				}	
    			}).done(function(){
    				/*console.log("done");*/
    			});
	    	});
	    }

	    /*end local storage*/
		getSession('email', function(r){
			if(r){
				$('#chat-container').show();
				$('#login-container').hide();
			}else{
				$('#login-container').show();
				$('#chat-container').hide();
			}
		});

		$('#live-chat header').on('click', function() {
			$('.chat').slideToggle(100, 'swing');
			$('.chat-message-counter').fadeToggle(0, 'swing');
		});

		$('.chat-close').on('click', function(e) {
			e.preventDefault();
			/*$('#live-chat').fadeOut(300);*/ /*jangan di aktifkan*/
		});
	} else {
	    /*Sorry! No Web Storage support..*/
	    alert("unfortunately. your browser doesn't support webchat. please update your browser.");
	}


}) ();