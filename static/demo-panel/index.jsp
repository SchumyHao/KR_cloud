<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"
    +request.getServerPort()+path+"/";
%>

<base href="<%=basePath%>">
<!DOCTYPE html>
<head>
	<title>Demo Panel</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="author" content="The Develovers">
	<style type="text/css">
		body {
			background: #fff;
			padding: 5px;
			font-family: "Helvetica Neue", sans-serif;
			font-size: 13px;
			color: #4d4d4d;
		}

		a {
			color: #4d4d4d;
			text-decoration: underline;
		}

		a:hover, a:focus {
			text-decoration: none;
		}

		ul {
			margin-top: 0;
			padding: 0;
			list-style: none;
		}

		ul li  {
			list-style-type: none;
			margin-bottom: 8px;
		}
		
		.button-option-list a {
			padding: 3px 10px;
			background-color: #ccc;
			color: #595959;
			text-decoration: none;
		}

		.button-option-list a:hover, .button-option-list a:focus {
			background-color: #bdbdbd;
			text-decoration: none;
		}

		.button-option-list a.active {
			background-color: #5CB85C; 
			color: #fff;
		}

		h2 {
			margin-top: 0;
			margin-bottom: 10px;
			font-size: 14px;
		}

		hr {
			margin-top: 20px;
			margin-bottom: 20px;
			border: 0;
			border-top: 1px solid #ccc;
		}

		.color-list {
			margin-bottom: 0;
		}

		.color-list > li {
			display: inline-block;
		}

		.color-list > li > a {
			display: inline-block;
			width: 20px;
			height: 20px;
			background-color: #000;
			border: 1px solid #eaeaea;
			text-align: center;
			text-decoration: none;
		}

		.color-list .mixed {
			background-color: #fff;
			height: auto;
		}

		.color-list .mixed span {
			display: block;
			width: 100%;
			height: 10px;
			margin: 1px 0;
			line-height: 20px;
		}

		.color-list.list-gradient > li,
		.color-list.list-gradient > li > a {
			display: block;
			width: 100%;
		}

		#navbar1 {
			background: -moz-linear-gradient(left, #187fff 0%, #6badff 100%);
			background: -webkit-linear-gradient(left, #187fff 0%, #6badff 100%);
			background: linear-gradient(to right, #187fff 0%, #6badff 100%);
		}

		#navbar2 {
			background: -moz-linear-gradient(left, #f54907 0%, #ff9800 100%);
			background: -webkit-linear-gradient(left, #f54907 0%, #ff9800 100%);
			background: linear-gradient(to right, #f54907 0%, #ff9800 100%);
		}

		#navbar3 {
			background: -moz-linear-gradient(left, #0bc3c3 0%, #009cff 100%);
			background: -webkit-linear-gradient(left, #0bc3c3 0%, #009cff 100%);
			background: linear-gradient(to right, #0bc3c3 0%, #009cff 100%);
		}

	</style>
</head>
<body>
	<div class="wrapper">
		<div class="demo-type">
			<h2>Top Navigation</h2>
			<ul class="color-list list-gradient" id="navbar-color">
				<li><a href="#" data-skin="navbar1" id="navbar1" target="_parent"></a></li>
				<li><a href="#" data-skin="navbar2" id="navbar2" target="_parent"></a></li>
				<li><a href="#" data-skin="navbar3" id="navbar3" target="_parent"></a></li>
			</ul>

			<hr>

			<h2>Sidebar Navigation</h2>
			<ul class="color-list" id="sidebar-color">
				<li><a href="#" data-skin="sidebar-nav-darkgray" target="_parent" style="background-color: #383838;" title="Dark Gray"></a></li>
				<li><a href="#" data-skin="sidebar-nav-darkblue" target="_parent" style="background-color: #2B333E;" title="Dark Blue"></a></li>
				<li><a href="#" data-skin="sidebar-nav-gray" target="_parent" style="background-color: #fdfdfd;" title="Gray"></a></li>
			</ul>

			<hr>
			
			<h2>Layout Options</h2>
			<ul>
				<li><a href="../layout-topnav.html" target="_parent">Top Navigation</a></li>
				<li><a href="../layout-minified.html" target="_parent">Minified Navigation</a></li>
				<li><a href="../layout-fullwidth.html" target="_parent">Fullwidth</a></li>
				<li><a href="../layout-default.html" target="_parent">Default</a></li>
			</ul>
		</div>
	</div>

	<script src="static/assets/vendor/jquery/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready( function() {
			$sourceURL = '';

			$attr =  window.parent.$('#demo-panel').attr('data-sourceURL');
			if (typeof $attr !== typeof undefined && $attr !== false) $sourceURL = window.parent.$('#demo-panel').attr('data-sourceURL');

			// COLOR OPTIONS
			$('#sidebar-color a').click( function(e) {
				e.preventDefault();

				var skinName = $(this).attr('data-skin');
				
				// clear any previous skin
				window.parent.$('#css-skin').remove();

				if(skinName !== '') {
					window.parent.$('head').append('<link id="css-skin" rel="stylesheet" href="' + $sourceURL + 'assets/css/skins/' + skinName + '.css" type="text/css" />');
				}

			});

			$('#navbar-color a').click( function(e) {
				e.preventDefault();

				var skinName = $(this).attr('data-skin');
				// clear any previous skin
				window.parent.$('#css-skin2').remove();

				if(skinName !== '') {
					window.parent.$('head').append('<link id="css-skin2" rel="stylesheet" href="' + $sourceURL + 'assets/css/skins/' + skinName + '.css" type="text/css" />');
				}
			});

			$('#reset1').click( function(e) {
				e.preventDefault();

				window.parent.$('#css-skin').remove();
			});

			$('#reset2').click( function(e) {
				e.preventDefault();

				window.parent.$('#css-skin2').remove();
			});

		});

	</script>
</body>
</html>




