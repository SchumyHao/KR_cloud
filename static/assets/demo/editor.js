

var id = window.location.hash.substring("#id=".length);
$.getJSON('/json/app_' + id + '.json', function (r, s) {
    var devices = r['devices'];
    $.each($.unique($.map(devices, function (val, i) {
       // return val['information']['vendor']['name'];
        return val['class'];
    })), function (i, catName) {
        var cat = $('<category id="" name="" colour="%{BKY_PROCEDURES_HUE}"></category>').attr('name', catName).attr('id','cat_' + catName).appendTo($('#toolbox'));
    });
    $.each(devices, function (i, dev) {
        Blockly.JavaScript[dev['information']['name']] = function(block) {
            var code = '';
            return [code, Blockly.JavaScript.ORDER_NONE];
        };
        Blockly.Blocks[dev['information']['name']] = {
            init: function() {
                this.appendDummyInput()
                    .appendField(dev['information']['name'])
                    .appendField(new Blockly.FieldImage(dev['information']['image'], 16, 16, "*"));
                ;

                for(var i =0; i < dev['input_data'].length; i++) {
                    this.appendValueInput(dev['input_data'][i]['name']).setCheck("Number").appendField(dev['input_data'][i]['name']);
                }
                this.setColour(180);
                this.setTooltip("this is tooltip");
                this.setHelpUrl("this is help url");
                this.setOutput(true, null);
                this.setColour(180);
            }
        };
        var blk = $('<block></block>').attr('type', dev['information']['name']);
        // var catName = dev['information']['vendor']['name'];
        var catName = dev['class'];
        $('#toolbox').find('#cat_' + catName).append(blk);
    });
});


$('#saveButton').click(function () {
    saveApp();
});

function saveApp() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var toSave = window.btoa(encodeURIComponent(xmlText));
    var id = window.location.hash.substring("#id=".length);
    $.post('/save_app_servlet',{
        "id": id,
        'content': toSave
    }, function (r, s) {

    });

}

function loadApp(content) {
    try {
        var text = decodeURIComponent(window.atob(content));
        var xmlDom = Blockly.Xml.textToDom(text);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    } catch(ex) {
        console.log(ex);
    }

}



$(function () {
    $.getJSON('/json/app_' + id + '.json', function (r, s) {
        loadApp(r['content']);
    });
});
