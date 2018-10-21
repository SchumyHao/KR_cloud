<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
		<title>Editor Page | KR - Focus on smart furniture</title>
		<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
		<!-- VENDOR CSS -->
		 <link rel="stylesheet" href="static/assets/vendor/bootstrap/css/bootstrap.min.css"> 
		<link rel="stylesheet" href="static/assets/vendor/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="static/assets/vendor/themify-icons/css/themify-icons.css">
		<link rel="stylesheet" href="static/assets/vendor/pace/themes/orange/pace-theme-minimal.css">
		<!-- MAIN CSS -->
		<link rel="stylesheet" href="static/assets/css/main.css">
		<link rel="stylesheet" href="static/assets/css/skins/sidebar-nav-darkgray.css" type="text/css">
		<link rel="stylesheet" href="static/assets/css/skins/navbar3.css" type="text/css">
		<!-- FOR DEMO PURPOSES ONLY. You should/may remove this in your project -->
		<link rel="stylesheet" href="static/assets/css/demo.css">
		<link rel="stylesheet" href="static/demo-panel/style-switcher.css">
		<!-- ZFY revised CSS -->
		<link rel="stylesheet" href="static/assets/css/zhufeiyueRevisedCss.css" type="text/css">
		<!-- ICONS -->
		<link rel="apple-touch-icon" sizes="76x76" href="static/assets/img/apple-icon.png">
		<link rel="icon" type="image/png" sizes="96x96" href="static/assets/img/favicon.png">
</head>
	<body class="sidebar-minified has-content-menu page-file-manager">
		<!-- WRAPPER -->
		<div id="wrapper">
			<!-- NAVBAR -->
			<nav class="navbar navbar-default navbar-fixed-top">
<!--				<div class="brand">
					<a href="apps.html">
						<img src="static/assets/img/logo-white.png" alt="Klorofil Pro Logo" class="img-responsive logo">
					</a>
				</div>
				<div class="container-fluid">
					<div id="tour-fullwidth" class="navbar-btn">
						<button type="button" class="btn-toggle-fullwidth" ><i class="ti-arrow-circle-left"></i></button>
					</div>
					<form class="navbar-form navbar-left search-form">
						<input type="text" value="" class="form-control" placeholder="搜索APP...">
						<button type="button" class="btn btn-default"><i class="fa fa-search"></i></button>
					</form>
					<div id="navbar-menu">
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle icon-menu" id = "lingdang"data-toggle="dropdown">
									<i class="ti-bell"></i>
									<span id="prompt-lingdang" class="badge bg-danger">5</span>
								</a>
								<ul class="dropdown-menu notifications">
									<li>您有新的通知</li>
									<li>
										<a href="#" class="notification-item">
											<i class="fa fa-hdd-o custom-bg-red"></i>
											<p>
												<span class="text">用户的空间几乎用完</span>
												<span class="timestamp">11 minutes ago</span>
											</p>
										</a>
									</li>

								</ul>
							</li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<img src="static/assets/img/user.png" alt="Avatar">
									<span>李小红</span>
								</a>
								<ul class="dropdown-menu logged-user-menu">
									<li><a href="#"><i class="ti-user"></i> <span>我的个人资料</span></a></li>
									<li><a href="#"><i class="ti-settings"></i> <span>设置</span></a></li>
									<li><a href="#" class="user-logout"><i class="ti-power-off"></i> <span>注销</span></a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>-->
			</nav>
			<!-- END NAVBAR -->
			<!-- LEFT SIDEBAR -->
			<div id="sidebar-nav" class="sidebar">
				<nav>
					<ul class="nav" id="sidebar-nav-menu">
						<li class="menu-group">Main</li>
						<li><a href="apps.jsp"><i class="ti-apple"></i> <span class="title">全部应用</span> <!--<span class="badge">3</span>--></a></li>
					</ul>
				</nav>
			</div>
			<!-- END LEFT SIDEBAR -->
			<!-- MAIN -->
			<div class="main">
				<!-- MAIN CONTENT -->
				<div class="main-content">
					<div class="content-heading clearfix">
						<div class="heading-left">
							<!--<h1 class="page-title">APP1</h1>-->
						</div>
						<ul class="breadcrumb">
							<li><a href="index.jsp"><i class="fa fa-home"></i>首页</a></li>
							<li class="active">APP编辑</li>
						</ul>
					</div>
					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-12">
								<iframe width="100%" height="1024px" style="border: none" id="frameCode"></iframe>
							</div>
						</div>
					</div>
				</div>
				<!-- END MAIN CONTENT -->
				<!-- RIGHT SIDEBAR -->
				<div id="sidebar-right" class="right-sidebar">
					<div class="sidebar-widget">
						<h4 class="widget-heading"><i class="fa fa-calendar"></i> TODAY</h4>
						<p class="date">Wednesday, 22 December</p>
						<div class="row margin-top-30">
							<div class="col-xs-4">
								<a href="#">
									<div class="icon-transparent-area custom-color-blue first">
										<i class="fa fa-tasks"></i>
										<span>Tasks</span>
										<span class="badge">5</span>
									</div>
								</a>
							</div>
							<div class="col-xs-4">
								<a href="#">
									<div class="icon-transparent-area custom-color-green">
										<i class="fa fa-envelope"></i>
										<span>Mail</span>
										<span class="badge">12</span>
									</div>
								</a>
							</div>
							<div class="col-xs-4">
								<a href="#">
									<div class="icon-transparent-area custom-color-orange last">
										<i class="fa fa-user-plus"></i>
										<span>Users</span>
										<span class="badge">24</span>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div class="sidebar-widget">
						<div class="widget-header">
							<h4 class="widget-heading">YOUR APPS</h4>
							<a href="#" class="show-all">Show all</a>
						</div>
						<div class="row">
							<div class="col-xs-3">
								<a href="#" class="icon-app" title="Dropbox" data-toggle="tooltip" data-placement="top">
									<i class="fa fa-dropbox dropbox-color"></i>
								</a>
							</div>
							<div class="col-xs-3">
								<a href="#" class="icon-app" title="WordPress" data-toggle="tooltip" data-placement="top">
									<i class="fa fa-wordpress wordpress-color"></i>
								</a>
							</div>
							<div class="col-xs-3">
								<a href="#" class="icon-app" title="Drupal" data-toggle="tooltip" data-placement="top">
									<i class="fa fa-drupal drupal-color"></i>
								</a>
							</div>
							<div class="col-xs-3">
								<a href="#" class="icon-app" title="Github" data-toggle="tooltip" data-placement="top">
									<i class="fa fa-github github-color"></i>
								</a>
							</div>
						</div>
					</div>
					<div class="sidebar-widget">
						<div class="widget-header">
							<h4 class="widget-heading">MY PROJECTS</h4>
							<a href="#" class="show-all">Show all</a>
						</div>
						<ul class="list-unstyled list-project-progress">
							<li>
								<a href="#" class="project-name">Project XY</a>
								<div class="progress progress-xs progress-transparent custom-color-orange">
									<div class="progress-bar" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="width:67%"></div>
								</div>
								<span class="percentage">67%</span>
							</li>
							<li>
								<a href="#" class="project-name">Growth Campaign</a>
								<div class="progress progress-xs progress-transparent custom-color-blue">
									<div class="progress-bar" role="progressbar" aria-valuenow="23" aria-valuemin="0" aria-valuemax="100" style="width:23%"></div>
								</div>
								<span class="percentage">23%</span>
							</li>
							<li>
								<a href="#" class="project-name">Website Redesign</a>
								<div class="progress progress-xs progress-transparent custom-color-green">
									<div class="progress-bar" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100" style="width:87%"></div>
								</div>
								<span class="percentage">87%</span>
							</li>
						</ul>
					</div>
					<div class="sidebar-widget">
						<div class="widget-header">
							<h4 class="widget-heading">MY FILES</h4>
							<a href="#" class="show-all">Show all</a>
						</div>
						<ul class="list-unstyled list-justify list-file-simple">
							<li><a href="#"><i class="fa fa-file-word-o"></i>Proposal_draft.docx</a>
								<span>4 MB</span>
							</li>
							<li><a href="#"><i class="fa fa-file-pdf-o"></i>Manual_Guide.pdf</a>
								<span>20 MB</span>
							</li>
							<li><a href="#"><i class="fa fa-file-zip-o"></i>all-project-files.zip</a>
								<span>315 MB</span>
							</li>
							<li><a href="#"><i class="fa fa-file-excel-o"></i>budget_estimate.xls</a>
								<span>1 MB</span>
							</li>
						</ul>
					</div>
					<p class="text-center"><a href="#" class="btn btn-default btn-xs">More Widgets</a></p>
				</div>
				<!-- END RIGHT SIDEBAR -->
			</div>
			<!-- END MAIN -->
			<div class="clearfix"></div>
			<footer>
<!--				<div class="container-fluid">
					<p class="copyright">&copy; 2018 <a href="https://www.themeineed.com" target="_blank">大鱼工作室</a>. 版权所有.</p>
				</div>
			</footer>-->
		</div>
		<!-- END WRAPPER -->
		<!-- Javascript -->
		<script src="static/assets/vendor/jquery/jquery.min.js"></script>
		<script src="static/assets/vendor/bootstrap/js/bootstrap.min.js"></script>
		<script src="static/assets/vendor/pace/pace.min.js"></script>
		<script src="static/assets/vendor/sweetalert2/sweetalert2.js"></script>
		<script src="static/assets/scripts/klorofilpro-common.js"></script>
		<script src="static/node_modules/Base64/base64.js"></script>
		<script src="static/js/logout.js"></script>

		<!-- DEMO PANEL -->
		<!-- for demo purpose only, you should remove it on your project directory -->
		<script type="text/javascript">
		var toggleDemoPanel = function(e)
		{
			e.preventDefault();
			var panel = document.getElementById('demo-panel');
			if (panel.className) panel.className = '';
			else panel.className = 'active';
		}
		// fix each iframe src when back button is clicked
		$(function()
		{
			//$('iframe').each(function()
			//{
			//	this.src = this.src;
			//});
		});
		</script>
		<div id="demo-panel">
			<!--<a href="#" onclick="toggleDemoPanel(event);"><i class="fa fa-cog fa-spin"></i></a>-->
			<iframe src="static/demo-panel/index.jsp"></iframe>
		</div>
		<!-- END DEMO PANEL -->

	<script>
		$("#frameCode").attr("src", "static/blockly/demos/code/index.html" + window.location.hash);
	</script>


	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×
					</button>
					<h4 class="modal-title" id="myModalLabel">
						添加新的BLOCKLY控件
					</h4>
				</div>
				<div class="modal-body">
					<div class="input-group">
						<span class="input-group-addon">自定义控件</span>
						<input type="text" class="form-control" id="textTempFile" placeholder="请上传ZIP格式的控件">
						<span class="input-group-btn">
							<button class="btn btn-primary" type="button" id="browseTempFile">...</button>
						</span>
					</div>
					<br>
				</div>
				<div class="modal-footer">

					<button type="button" class="btn btn-default"
							data-dismiss="modal">取消
					</button>
					<button type="button" class="btn btn-primary" id="btnSaveBlock">
						保存
					</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->


	<script>
		var tempFileData = null;

		$('#browseTempFile').click(function () {
			var fi = $('<input type="file" />');
			fi.on("change", function (source) {
				var file = source.target.files[0];
				$('#textTempFile').val(file.name);
				var fr = new FileReader();
				fr.onload = function loaded(fevt) {
					tempFileData = fevt.target.result;
				}
				fr.readAsDataURL(file);
			});
			fi.click();

		});

		$('#btnSaveBlock').click(function () {
			$.post('/save_block_servlet', {
				'zipcode': tempFileData
			}, function (r, s) {
				var jo = $.parseJSON(r);
				if(!jo['status']) {
					alert(jo["reason"]);
				} else {
					$("#myModal").modal('hide');
					console.log(jo['data']);
					document.getElementById("frameCode").contentWindow.devAdd(jo['data']);
				}
			});
		});
		function showAddBlock() {
			tempFileData = null;
			$('#textTempFile').val("");
			$("#myModal").modal('show');
		}

	</script>
	</body>
</html>
