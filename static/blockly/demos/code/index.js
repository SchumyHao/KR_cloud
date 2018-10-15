/**
 * Created by d on 2018/9/3.
 */


//======added by lcc
var id = window.location.hash.substring("#id=".length);

load_devs_for_app(function () {
    $.getJSON('../../../json/app_' + id + '.json', function (r, s) {
        loadApp(r['content']);
    });
});

// load_devs_for_statics();


/**
 * 加载app内的block
 */
function load_devs_for_app(done) {
    $.getJSON('../../../json/app_' + id + '.json', function (r, s) {
        var devices = r['devices'];
        $.each($.unique($.map(devices, function (val, i) {
            // return val['information']['vendor']['name'];
            return val['class'];
        })), function (i, catName) {
            var cat = $('<category id="" name="" colour="%{BKY_PROCEDURES_HUE}"></category>').attr('name', catName).attr('id','cat_' + catName).appendTo($('#toolbox'));
        });
        $.each(devices, function (i, dev) {
            console.log(dev);
            devAdd(dev);
        });
        done();

    });
}

/**
 * 加载静态block
 */
function load_devs_for_statics(done) {
    $.getJSON("/load_static_blocks",{}, function (r, s) {
        $.each(r, function (i, cat) {
            console.log(cat.name);
            var elem = $('<category id="" name="" colour="%{BKY_PROCEDURES_HUE}"></category>').attr('name', cat.name).attr('id','cat_' + cat.name).appendTo($('#toolbox'));
            $.each(cat.blocks, function (j, blockJson) {
                staticAdd(cat.name, blockJson);
            });
        });
        done();
    });
}



function staticAdd(catName, staticDev) {
    Blockly.JavaScript[staticDev.name] = function(block) {
        var code = '';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
    Blockly.Blocks[staticDev.name] = {
        init: function() {
            this.appendDummyInput().appendField(staticDev.name);
            var thisBlk = this;
            $.each(staticDev.fields, function (iName, iValue) {
                var check = "Number";
                thisBlk.appendValueInput(iName).setCheck(check).appendField(iName);
            });
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(180);
            this.setTooltip(staticDev.description);
            this.setHelpUrl("this is help url");
            this.setColour(180);
        }
    };
    var blk = $('<block></block>').attr('type', staticDev.name);
    if(!$('#toolbox').find('#cat_' + catName)) {
        $('<category id="" name="" colour="%{BKY_PROCEDURES_HUE}"></category>').attr('name', catName).attr('id','cat_' + catName).appendTo($('#toolbox'));
    }
    $('#toolbox').find('#cat_' + catName).append(blk);
}

function devAdd(dev) {
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
    var catName = dev['class'];
    if(!$('#toolbox').find('#cat_' + catName)) {
        $('<category id="" name="" colour="%{BKY_PROCEDURES_HUE}"></category>').attr('name', catName).attr('id','cat_' + catName).appendTo($('#toolbox'));
    }
    $('#toolbox').find('#cat_' + catName).append(blk);

}

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
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
    } catch(ex) {
        console.log(ex);
    }

}

/*
import { createCollection } from "home-assistant-js-websocket";

function panelRegistered(state, event) {
  // Returning null means no change.
  if (state === undefined) return null;

  // This will be merged with the existing state.
  return {
    panels: state.panels.concat(event.data.panel)
  };
}

const fetchPanels = conn => conn.sendMessagePromise({ type: "get_panels" });
const subscribeUpdates = (conn, store) =>
  conn.subscribeEvents(store.action(panelRegistered), "panel_registered");

const subscribePanels = (conn, onChange) =>
  createCollection("_pnl", fetchPanels, subscribeUpdates, conn, onChange);

const  subscribePanels = function(conn, onChange) {
	return createCollection("_pnl", fetchPanels, subscribeUpdates, conn, onChange);
}
// Now use collection
subscribePanels(conn, panels => console.log("New panels!", panels));
*/







