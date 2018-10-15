
$('#btnLogin').click(function () {
				console.log( $("#signin-name").val());
				console.log($("#signin-password").val());
			   $.post('user/login.action', {
			       'username': $("#signin-name").val(),
			       'userpassword': $("#signin-password").val()
			     
			   }, function (response) {
				  // var json = $.parseJSON(response);
				  // alert(response['situation']);
				   if(response['situation'] == "success"){
					   //window.history.go(-1);
					   window.location.href = 'index.jsp';
				  }else{
					   alert("账户密码错误，请重新登陆");
				   window.location.href = '#';
				   }
			       //window.location.href = 'apps.jsp';
			   });
			});
