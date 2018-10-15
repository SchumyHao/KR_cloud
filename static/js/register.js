
$('#btnRegister').click(function () {
   
   $.post('user/regist.action', {
       'username': $("#signin-name").val(),
       'useremail': $("#signin-email").val(),
       'userpassword': $("#signin-password").val()
     
   }, function (response) {
	   
		   window.location.href = 'login.jsp';
	  
	
       //window.location.href = 'apps.jsp';
   });
   
});