<%@ page language="java" contentType="text/html" 
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

		<!-- ZFY revised CSS -->
		<link rel="stylesheet" href="static/assets/css/zhufeiyueRevisedCss.css" type="text/css">
		<title>Login Page | KR - Focus on smart furniture</title>
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
								<p class="lead">请登录</p>
							</div>
							<form class="form-auth-small" >
								<div class="form-group">
									<label for="signin-name" class="control-label sr-only">Name</label>
									<input type="text" name="username" class="form-control" id="signin-name" placeholder="请输入用户名">
								</div>
								
								<div class="form-group">
									<label for="signin-password"  class="control-label sr-only">Password</label>
									<input type="password" name="userpassword" class="form-control" id="signin-password" placeholder="Password">
								</div>
								<div class="form-group clearfix">
									<label class="fancy-checkbox element-left custom-bgcolor-blue">
										<input type="checkbox">
										<span class="text-muted">记住密码</span>
									</label>
									<span class="helper-text element-right">没有账号? <a href="register.jsp">注册</a></span>
								</div>
								<button type="button" class="btn btn-primary btn-lg btn-block" id="btnLogin">登录</button>
								<div class="bottom">
									<span class="helper-text"><i class="fa fa-lock"></i> <a href="page-forgot-password.html">忘记密码?</a></span>
								</div>
							</form>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- END WRAPPER -->
		<script src="static/assets/vendor/jquery/jquery.min.js"></script>
		<script src="static/assets/vendor/bootstrap/js/bootstrap.min.js"></script>
		<script src="static/assets/vendor/pace/pace.min.js"></script>
		<script src="static/assets/vendor/sweetalert2/sweetalert2.js"></script>
		<script src="static/assets/scripts/klorofilpro-common.js"></script>
		<script src="static/node_modules/Base64/base64.js"></script>
		<script src="static/js/login.js"></script>
		
	</body>
</html>
