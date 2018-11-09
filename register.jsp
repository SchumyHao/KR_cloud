<%@ page language="java" contentType="text/html" 
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
	<title>Register Page | KR - Focus on smart furniture</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- VENDOR CSS -->
	<link rel="stylesheet" href="static/assets/vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="static/assets/vendor/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="static/assets/vendor/themify-icons/css/themify-icons.css">
	<!-- MAIN CSS -->
	<link rel="stylesheet" href="static/assets/css/main.css">
	<!-- FOR DEMO PURPOSES ONLY. You should remove this in your project -->
	<link rel="stylesheet" href="static/assets/css/demo.css">
	<!-- GOOGLE FONTS -->
	<link href="static/assets/css/font/Source-Sans-Pro.css" rel="stylesheet">
	<!-- ICONS -->
	<link rel="apple-touch-icon" sizes="76x76" href="static/assets/img/apple-icon.png">
	<link rel="icon" type="image/png" sizes="96x96" href="static/assets/img/favicon.png">
	<!-- ZFY revised CSS -->
	<link rel="stylesheet" href="static/assets/css/zhufeiyueRevisedCss.css" type="text/css">
</head>
<body>
<!-- WRAPPER -->
<div id="wrapper">
	<div class="vertical-align-wrap">
		<div class="vertical-align-middle">
			<div class="auth-box ">
				<div class="content">
					<div class="header">
						<div class="logo text-center">
							<img src="static/assets/img/logo-white.png" alt="Klorofil Logo">
						</div>
						<p class="lead">注册新用户</p>
					</div>
					<form class="form-auth-small" >
						<div class="form-group">
							<label for="signin-name" class="control-label sr-only">账号</label>
							<input type="text" class="form-control" name = "username" id="signin-name" placeholder="请输入用户账号">
						</div>

						<div class="form-group">
							<label for="signin-password" class="control-label sr-only">Password</label>
							<input type="password" name = "userpassword" class="form-control" id="signin-password"  placeholder="请输入密码">
						</div>
						<button type="button" class="btn btn-primary btn-lg btn-block" id="btnRegister">注册</button>

					</form>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</div>
<!-- END WRAPPER -->
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×
				</button>
				<h4 class="modal-title" id="myModalLabel">

				</h4>
			</div>
			<div class="modal-body">
				<span id="msgBody"></span>
			</div>
			<div class="modal-footer">

				<button type="button" class="btn btn-warning"
						data-dismiss="modal">好的
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<script src="static/assets/vendor/jquery/jquery.min.js"></script>
<script src="static/assets/vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="static/assets/vendor/pace/pace.min.js"></script>
<script src="static/assets/vendor/sweetalert2/sweetalert2.js"></script>
<script src="static/assets/scripts/klorofilpro-common.js"></script>
<script src="../static/node_modules/Base64/base64.js"></script>
<script src="static/js/register.js"></script>
</body>
</html>
