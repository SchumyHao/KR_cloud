function apps_reload() {
    $.getJSON("application/selectAppByUserid.action", function (r, s) {
    	console.log(r);
       $.each(r, function (i, obj) {
    	   console.log(obj);
           apps_add(obj);
       });
        apps_add_plus();
    });
}

function apps_add_plus() {
    var code = '';
    code += '<li class="file-item">';
    code += '	<a class="new-item">';
    code += '		<span class="file-preview pdf">';
    code += '         <i class="fa fa-plus"></i>';
    code += '		</span>';
    code += '	</a>';
    code += '	<div class="file-info">';
    code += '		<a class="new-item">';
    code += '			<span class="file-name">点击+号创建新的APP</span>';
    code += '		</a>';
    code += '		<span class="file-author"></span>';
    code += '	</div>';
    code += '</li>';

    var e = $(code);
    e.appendTo($('.list-files'));
    e.find('.new-item').click(function () {
    	
        $.getJSON("user/getUser.action", function (r, s) {
        	//alert(r['status']);
        	console.log(r);
        	if(r['status']=="failed"){
        		//alert(r['status']);
        		window.location.href='login.jsp';
        	}else{
        		$("#imgAppCover").attr('src', "static/imgs/plus1.png");
        		$("#textAppAuthorName").val(r['name']);
        		$("#textAppAuthorEmail").val(r['email']);
        		$("#error-text").text("");
            //console.log(r);
            //window.location.href = 'apps.jsp';
        		$("#myModal").modal('show');
            //$("#myModal").show();
        	}
        }
        );
        
    });

}

function apps_add(flow) {
    var code = '';
    code += '<li class="file-item">';
    code += '	<a href="#" class="app-url">';
    code += '		<span class="file-preview image">';
    code += '			<img src="static/assets/img/files/file-image3.jpg" class="img-responsive app-face" alt="" style="width: 100%">';
    code += '		</span>';
    code += '	</a>';
    code += '	<div class="file-info">';
    code += '		<a href="#">';
    code += '			<span class="file-name"></span>';
    code += '		</a>';
    code += '		<span class="file-author"></span>';
    code += '		<div class="dropdown">';
    code += '			<a href="#" class="toggle-dropdown" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>';
    code += '			<ul class="dropdown-menu dropdown-menu-right">';
    code += '				<a class = "editorApp"><li class = "editorApp"><i class="fa fa-pencil"></i> 编辑</li></a>';
    code += '				<a class = "delApp"><li class = "deleteApp"><i class="fa fa-trash"></i> 删除</li></a>';
    code += '			</ul>';
    code += '		</div>';
    code += '	</div>';
    code += '</li>';

    var e = $(code);
    $(e).find('.file-author').text(flow.authorname);
    $(e).find('.file-name').text(flow.name);
    console.log(flow.image);
    $(e).find('.app-face').attr('src', flow.image);
    $(e).find('.app-url').attr('href', 'editor.jsp#id=' + flow.appid);
    $(e).find('.editorApp').attr('href', 'editor.jsp#id=' + flow.appid);
//  $(e).find('.delApp').attr('href', 'application/delete.action?appid=' + flow.appid);
    $(e).find('.delApp').attr('href', 'delete.jsp#id=' + flow.appid);
    var fld = flow.appid
     
    $("#delete"+fld).click(
    	function(){
    		console.log(flow.appid);
    		$.post("application/delete.action",{
    			"appid":fld,
    		},
    		function(r,s){
    		window.location.href = "app.jsp";    		}
		);
   	}
    );
    
    //$(e).find('.fa fa-pencil').attr('href', 'editor.jsp#id=' + flow.information.id);
    //$(e).find('.fa fa-trash').attr('href', 'editor.jsp#id=' + flow.information.id);
    e.appendTo($('.list-files'));

    /*
    switch (flow.status.status[0]) {
        case 'stop':
            $(e).find('.card-app-body').addClass('card-header-danger');
            $(e).find('.card-error-icon').text('stop');
            $(e).find('.card-error-icon').addClass('text-danger');
            break;
        case 'running':
            $(e).find('.card-app-body').addClass('card-header-success');
            $(e).find('.card-error-icon').text('autorenew');
            $(e).find('.card-error-icon').addClass('text-success');
            break;
        case 'error':
            $(e).find('.card-app-body').addClass('card-header-warning');
            $(e).find('.card-error-icon').text('error');
            $(e).find('.card-error-icon').addClass('text-warning');
            break;
        case 'pause':
            $(e).find('.card-app-body').addClass('card-header-rose');
            $(e).find('.card-error-icon').text('pause');
            $(e).find('.card-error-icon').addClass('text-rose');
            break;
        default:
            $(e).find('.card-app-body').addClass('card-header-primary');
            $(e).find('.card-error-icon').addClass('text-primary');
            $(e).find('.card-error-icon').text('autorenew');
    }
    if(flow.status.error_info.error_message!="null") {
        $(e).find('.card-error-text').text(flow.status.error_info.error_message);
    } else {

    }

    */
}

function recover_blockly(last_blockly){
	var xml_text = decodeURIComponent(window.atob(last_blockly));
	var xml_dom = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml_dom, Blockly.mainWorkspace);
	}
//transform block to code
function trans2javascript(){
	var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
	return code;
	}
//return code of blockApp
function saveblockly(){
	var xml_dom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var xml_text = Blockly.Xml.domToPrettyText(xml_dom);
	return window.btoa(encodeURIComponent(xml_text));
	}


function apps_reomve() {
	
}

apps_reload();


$('#buttonNew').click(function () {
   window.location.href = 'editor.jsp';
});


$("#imgAppCover").click(function () {
    var fi = $('<input type="file" />');
    fi.on("change", function (source) {
        var file = source.target.files[0];
        var fr = new FileReader();
        fr.onload = function loaded(fevt) {
            $("#imgAppCover").attr("src", fevt.target.result);
            console.log(source.target); 
        }
        var objUrl = getObjectURL(file) ;
        console.log(objUrl);
        //console.log( source.target.files);
        fr.readAsDataURL(file);
        
    });
    fi.click();
});

$("#btnCreateApp").click(function () {
//	var img = $("#imgAppCover").attr('src');
//	console.log(img.split(",")[1]);
	
   $.post("application/new_app.action", {
       'appname': $("#textAppName").val(),
       'appdescribtion': $("#textAppDesc").val(),
       'appauthor':$("#textAppAuthorName").val(),
       'appAuthorEmail':$("#textAppAuthorEmail").val(),
//       'appimg': img.split(",")[1]
   }, function (r, s) {
       //var json = $.parseJSON(r);
       console.log(r);
       
       $("#myModal").modal('hide');
       window.location.href = 'editor.jsp#id=' + r["appid"];
       
   }) ;
});

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
