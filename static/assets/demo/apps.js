function apps_reload() {
    $.getJSON("../static/json/app_list.json", function (r, s) {
       $.each(r['flows'], function (i, obj) {
           apps_add(obj);
       });
    });
}

function apps_add(flow) {
    var code = '';
    code +='            <div class="col-lg-3 col-md-6 col-sm-6">';
    code +='              <div class="card card-stats">';
    code +='                <div class="card-header card-header-icon card-app-body">';
    code +='                  <div class="card-icon">';
    code +='                    <img class="card-face" style="width: 64px; height: 64px" src="" />';
    code +='                  </div>';
    code +='                  <p class="card-category">Used Space</p>';
    code +='                  <a href="#" class="card-editor-link">';
    code +='                      <h3 class="card-title">49/50';
    code +='                      </h3>';
    code +='                  </a>';
    code +='                </div>';
    code +='                <div class="card-footer">';
    code +='                  <div class="stats">';
    code +='                    <i class="material-icons card-error-icon">alarm</i>';
    code +='                    <a href="#pablo" class="card-error-text"></a>';
    code +='                  </div>';
    code +='                </div>';
    code +='              </div>';
    code +='            </div>';
    var e = $(code);
    $(e).find('.card-category').text(flow.information.author.name);
    $(e).find('.card-title').text(flow.information.name);
    $(e).find('.card-face').attr('src', flow.information.image);
    $(e).find('.card-editor-link').attr('href', 'editor.jsp#id=' + flow.information.id);

    e.appendTo($('.app-row'))

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

}

function apps_reomve() {

}

apps_reload();


$('#buttonNew').click(function () {
   window.location.href = 'editor.jsp';
});