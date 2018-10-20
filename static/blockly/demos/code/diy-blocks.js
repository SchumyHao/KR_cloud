//var g_hass_service = {};
//var g_hass_dev = {};

//gUserServices = {
//  domainName: {
//      componentName: {
//          serviceName: {
//              valid: true
//          }
//      }
//  }
//}
var gUserServices = {}
//gUserStates = {
//    domainName: {
//        deviceName: {
//          states: []
//          friendlyName: 
//        }
//    }
//}
var gUserStates = {}

//init mqtt
var token;
//
//connect to mqtt
function connectToMqtt() {
  $.ajaxSettings.async = false;
  $.post('../../../../user/getToken.action', function (r, s) {
    token = r;
  });
  $.ajaxSettings.async = true;
}

connectToMqtt();


function getDevices(token) {
  console.log('getDevices')
  var devices = {
    "type": "getDevices",
    "comContent": ""
  }
  send_by_mqtt(token, JSON.stringify(devices));
}

function updateUserStates (devs) {
  for (var i in devs) {
    dev = devs[i]
    if (!dev.hasOwnProperty('entity_id')) {
      console.log(dev+'do not contains entity_id')
      continue;
    }
    var a = dev['entity_id'].split('.')
    var domain = a[0]
    var devName = a[1]
    if (!gUserStates.hasOwnProperty(domain)) {
      gUserStates[domain] = {}
    }
    gUserStates[domain]['valid'] = true
    if (!gUserStates[domain].hasOwnProperty(devName)) {
      gUserStates[domain][devName] = {}
    }
    gUserStates[domain][devName]['valid'] = true
    if (dev.hasOwnProperty('state')) {
      if (!gUserStates[domain][devName].hasOwnProperty('states')) {
        gUserStates[domain][devName]['states'] = {}
      }
      if (!gUserStates[domain][devName]['states'].hasOwnProperty('state')) {
        gUserStates[domain][devName]['states']['state'] = {}
      }
      gUserStates[domain][devName]['states']['state']['valid'] = true
    }
    if (dev.hasOwnProperty('attributes')) {
      if (!gUserStates[domain][devName].hasOwnProperty('states')) {
        gUserStates[domain][devName]['states'] = {}
      }
      for (k in dev['attributes']) {
        if (k === 'friendly_name') {
          gUserStates[domain][devName]['friendlyName'] = dev['attributes']['friendly_name']
          continue;
        }
        if (!gUserStates[domain][devName]['states'].hasOwnProperty(k)) {
          gUserStates[domain][devName]['states'][k] = {}
        }
        gUserStates[domain][devName]['states'][k]['valid'] = true
      }
    }
  }
}

function updateUserServices(devs) {
  for (var i in devs) {
    dev = devs[i]
    if (!dev.hasOwnProperty('entity_id')) {
      console.log(dev+'do not contains entity_id')
      continue;
    }
    var a = dev['entity_id'].split('.')
    var domain = a[0]
    if (!gUserServices.hasOwnProperty(domain)) {
      gUserServices[domain] = {}
    }
    gUserServices[domain]['valid'] = true
  }
}

//called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  var hass_dev = JSON.parse(message.payloadString);
  updateUserStates(hass_dev)
  updateUserServices(hass_dev)
  //here, init..
  load_defalut_hass_standard_blocks(hass_dev);
  //Code.init();
}

getDevices(token);

//here, init..

function load_defalut_hass_standard_blocks(hass_dev) {
  //add devices
  add_device_block();
  //add state
  add_state_blocks();
  //add trigger
  add_trigger_block();
  //add service
  $.ajaxSettings.async = false;
  $.get("../../../../blocks/load_sql_blocks.action", {}, function serviceBlockReady(r, s) {
    if (Object.keys(r).length > 0 && $('#toolbox').find('#service_ctg_id').length <= 0) {
      $('<category id="" name="" colour="16"></category>').attr('name', "Service").attr('id', 'service_ctg_id').appendTo($('#toolbox'));
    }
    $.each(r, function (key, value) {
      if (gUserServices.hasOwnProperty(value.domain)) {
        if (gUserServices[value.domain].valid) {
          add_service_block(value);
        }
      }
    });

  });
  $.ajaxSettings.async = true;
  load_devs_for_app();
  Code.init();


  //rendering blocks
  //rendering();
}



//function load_devs_for_statics() {
//	$.ajaxSettings.async = false;
//	$.get("../../../../blocks/load_static_blocks.action", {},function serviceBlockReady(r,s){
//		 //serviceBlock = r;
//		 //console.log(typeof serviceBlock);
//		 add_hass_service_blocks(r);
//		 //Code.init;
//
//	});
//	$.ajaxSettings.async = true;
//}
//
//load_devs_for_statics();

var operation2String = {
  'EQ': '==',
  'NEQ': '!==',
  'GTE': '>=',
  'GT': '>',
  'LSE': '<=',
  'LS': '<'
}

function isNumber(nubmer) {
  var re = /^[0-9]+.?[0-9]*/;
  if (re.test(nubmer)) {
    return true
  } else {
    return false
  }
}

function add_device_block_with_domain (domain, devices) {
  var devList = []

  delete devices.valid
  for (k in devices) {
    var devItem = []
    if (devices[k].hasOwnProperty('friendlyName')) {
      devItem.push(`${devices[k].friendlyName}`)
    } else {
      devItem.push(`${k}`)
    }
    devItem.push(`${domain}.${k}`)
    devList.push(devItem)
  }


  Blockly.Blocks[domain] = {
    init: function () {
      this.appendDummyInput().appendField(domain);
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(devList),'devName');
      this.setInputsInline(true);
      this.setOutput(true, "String");
      this.setColour(30);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  //trans javascript
  Blockly.JavaScript[domain] = function (block) {
    var deviceEntityId = block.getFieldValue('devName')
    //var text_entity_id = block.getFieldValue(entity_id) || '\'\'';
    //var code = text_entity_id;
    return [`${deviceEntityId}`];
  };
  //add into toolbox
  var blk = $('<block></block>').attr('type', domain);
  if ($('#toolbox').find('#dev_ctg_id').length <= 0) {
    $('<category id="" name="" colour="30"></category>').attr('name', "Devices").attr('id', 'dev_ctg_id').appendTo($('#toolbox'));
  }
  $('#toolbox').find('#dev_ctg_id').append(blk);
}

function add_device_block () {
  for (k in gUserStates) {
    if (gUserStates[k].valid) {
      add_device_block_with_domain(k, gUserStates[k])
    }
  }
}

function add_trigger_block() {
  Blockly.Blocks['trigger_framework'] = {
    init: function () {

      this.appendDummyInput().appendField('If')
      this.appendValueInput("entity_id").setCheck("String");
      this.appendDummyInput().appendField(`device's`);
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('state'), 'stateName');
      this.appendDummyInput().appendField("value");
      this.appendDummyInput().appendField("from");
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('old'), 'from');
      this.appendDummyInput().appendField("to");
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('new'), 'to');
      this.appendStatementInput('DO').appendField('do');

      this.setInputsInline(true);
      this.setOutput(false, null);
      this.setNextStatement(true, null)
      this.setColour(256);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['trigger_framework'] = function (block) {
    var value_entity_id = Blockly.JavaScript.valueToCode(block, 'entity_id', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = block.getFieldValue('stateName')
    var value_from = block.getFieldValue('from')
    var value_to = block.getFieldValue('to')
    var StatementCode = Blockly.JavaScript.statementToCode(block, 'DO')

    if (value_from != null) {
      if (!isNumber(value_from)) {
        value_from = `'${value_from}', `
      } else {
        value_from = `${value_from}, `
      }
    }

    if (value_to != null) {
      if (!isNumber(value_to)) {
        value_to = `'${value_to}', `
      } else {
        value_to = `${value_to}, `
      }
    }

    var code = `
subscribedTrigger.push(state_trigger.subscribe('${value_entity_id}', '${value_name}', ${value_from}${value_to}() => {
  ${StatementCode}
}))`;
    // TODO: Change ORDER_NONE to the correct strength.
    // return [code, Blockly.JavaScript.ORDER_ATOMIC];
    return code
  };
  var blk = $('<block></block>').attr('type', 'trigger_framework');
  if ($('#toolbox').find('#trigger_ctg_id').length <= 0) {
    $('<category id="" name="" colour="256"></category>').attr('name', "Trigger").attr('id', 'trigger_ctg_id').appendTo($('#toolbox'));
  }
  $('#toolbox').find('#trigger_ctg_id').append(blk);
}



function add_read_state_block() {
  // Read state block
  Blockly.Blocks['read_state'] = {
    init: function () {
      this.appendDummyInput().appendField(`get`);
      this.appendValueInput("entity_id").setCheck("String");
      this.appendDummyInput().appendField(`device's`);
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('state'), 'stateName');
      this.appendDummyInput().appendField("value");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(60);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['read_state'] = function (block) {
    var value_entity_id = Blockly.JavaScript.valueToCode(block, 'entity_id', Blockly.JavaScript.ORDER_ATOMIC);
    var value_state_name = block.getFieldValue('stateName')

    var code = `state.get('${value_entity_id}', '${value_state_name}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  var blk = $('<block></block>').attr('type', 'read_state');
  if ($('#toolbox').find('#state_ctg_id').length <= 0) {
    $('<category id="" name="" colour="60"></category>').attr('name', "States").attr('id', 'state_ctg_id').appendTo($('#toolbox'));
  }
  $('#toolbox').find('#state_ctg_id').append(blk);
}

function add_read_state_compare_block() {
  // Read state block with compare
  Blockly.Blocks['read_state_compare'] = {
    init: function () {
      this.appendDummyInput().appendField(`if`);
      this.appendValueInput("entity_id").setCheck("String");
      this.appendDummyInput().appendField(`device's`);
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('state'), 'stateName');
      this.appendDummyInput().appendField("value");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(
        [
          ['＝', 'EQ'],
          ['≠', 'NEQ'],
          ['≥', 'GTE'],
          ['>', 'GT'],
          ['≤', 'LSE'],
          ['<', 'LS']
        ]),'opt');
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('on'), 'stateValue');
      this.appendStatementInput('DO1').appendField('do');
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setInputsInline(true);
      this.setColour(80);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['read_state_compare'] = function (block) {
    var value_entity_id = Blockly.JavaScript.valueToCode(block, 'entity_id', Blockly.JavaScript.ORDER_ATOMIC);
    var value_state_name = block.getFieldValue('stateName')
    var value_state_value = block.getFieldValue('stateValue')
    var value_state_opt = block.getFieldValue('opt')
    var StatementCode = Blockly.JavaScript.statementToCode(block, 'DO1')

    if (value_state_value != null) {
      if (!isNumber(value_state_value)) {
        value_state_value = `'${value_state_value}'`
      } else {
        value_state_value = `${value_state_value}`
      }
    }

    var code =
`
if (state.get('${value_entity_id}', '${value_state_name}') ${operation2String[value_state_opt]} ${value_state_value}) {
  ${StatementCode}
}
`;
    //return [code, Blockly.JavaScript.ORDER_ATOMIC];
    return code
  };

  var blk = $('<block></block>').attr('type', 'read_state_compare');
  if ($('#toolbox').find('#state_ctg_id').length <= 0) {
    $('<category id="" name="" colour="60"></category>').attr('name', "States").attr('id', 'state_ctg_id').appendTo($('#toolbox'));
  }
  $('#toolbox').find('#state_ctg_id').append(blk);
}

function add_state_blocks () {
  // Defile state blocks here
  add_read_state_block()
  add_read_state_compare_block()
}


var locationPath = window.location;
var path = locationPath.href;

var splitPath = path.split("=")[1];
console.log(splitPath);

function add_service_block(service) {
  var ds = service.domain + "." + service.service;
  Blockly.Blocks[ds] = {
    init: function () {
      this.appendDummyInput().appendField(service.service);
      var thisbak = this;
      $.each(service.fields, function (key, value) {
        var type = "String";
        if (Number.isInteger(value.example)) {
          type = "Number";
        }
        thisbak.appendValueInput(key).setCheck(type).appendField(key);
      });
      this.setPreviousStatement(true, "null");
      this.setNextStatement(true, "null");
      this.setColour(16);
      this.setTooltip("tooltip");
      this.setHelpUrl("help url");
    }
  };
  //var content = '';
  //$.each(service.fields, function(key, value){
  //     var v = '\'\\\'\\\'\'';
  //     if (Number.isInteger(value.example)){
  //         v = 0;
  //     }
  //	 content += 'var value_'+ key +' = Blockly.JavaScript.valueToCode(block,\'' + key+'\', Blockly.JavaScript.ORDER_ATOMIC) || ' +v+';';
  //});

  //var trans = "function(block){ " +content+ " return \'null\'; };";
  //console.log(trans);

  //var trans = "function(block){ return \"123456\"; };";
  //Blockly.JavaScript[service.service] = trans;
  Blockly.JavaScript[ds] = function (block) {
    var code = `service.call('${service.domain}', '${service.service}'`;
    if (service.fields) {
      var validItem = false
      var subCode = ''
      $.each(service.fields, function (key, value) {
        //console.log(key+","+value.description);
        var c = Blockly.JavaScript.valueToCode(block, key, Blockly.JavaScript.ORDER_NONE);
        //c = "\""+c+"\""
        if (c) {
          validItem = true
          subCode = subCode + `"${key}": `;
          subCode = subCode.concat(`"${c}"`);
          subCode = subCode + ",";
        }
      });
      if (validItem) {
        code = code + ", {"
      }
      code = code + subCode
      if (validItem) {
        code = code.substring(0, code.length - 1)
        code = code + "}";
      }
    }
    code = code + ")";
    return code;
  };

  var blk = $('<block></block>').attr('type', service.domain + "." + service.service);
  if ($('#toolbox').find('#service_ctg_id').find('#service_ctg_id_' + service.domain).length <= 0) {
    $('<category id="" name="" colour="16"></category>').attr('name', service.domain).attr('id', 'service_ctg_id_' + service.domain).appendTo($('#toolbox').find('#service_ctg_id'));
  }
  $('#toolbox').find('#service_ctg_id').find('#service_ctg_id_' + service.domain).append(blk);
}
//recover block from database
function recover_blockly(last_blockly) {
  var xml_text = decodeURIComponent(window.atob(last_blockly));
  var xml_dom = Blockly.Xml.textToDom(xml_text);
  Blockly.Xml.domToWorkspace(xml_dom, Blockly.mainWorkspace);
}
//transform block to code
function trans2javascript() {
  var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
  return code;
}
//return code of blockApp
function saveblockly() {
  var xml_dom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml_dom);
  return window.btoa(encodeURIComponent(xml_text));
}
//var workspace;

//function rendering(){
//	workspace = Blockly.inject('content_area',
//		 {media: '../../media/',
//			 toolbox: document.getElementById('toolbox')});
//	
//}

//function generate_code(){
//	var code = Blockly.JavaScript.workspaceToCode(workspace);
//	alert(code);
//}

function load_devs_for_app() {

  $.post('../../../../application/selectAppById.action', {
    "appid": splitPath
  }, function (r, s) {
    console.log(r);
    recover_blockly(r);
  });
}

$("#saveButton").click(
  function save_devs_for_app(done) {

    $.post('../../../../application/savaContent.action', {
      "appid": splitPath,
      "content": saveblockly()
    }, function (r, s) {
      alert("保存成功");
    });
  }
)

//

//sent message to mqtt
//sent code

function sentMessageToMqtt() {
  $.post('../../../../application/sentMessageToLocal.action', {
    "appid": splitPath,
    "code": trans2javascript()
  }, function (r, s) {
    console.log(token + "   " + r);
    send_by_mqtt(token, r);
  });
}
//send suspend message
function sentSuspendMessageToMqtt() {
  $.post('../../../../application/suspentMessageToLocal.action', {
    "appid": splitPath,
    "code": trans2javascript()
  }, function (r, s) {
    send_by_mqtt(token, r);
  });
}
//send device message
function callDevice() {
  $.post('../../../../blocks/load_device_blocks.action', function (r, s) {
    send_by_mqtt(token, r);
  });
}
$("#runButton").click(
  function save_devs_for_app(done) {
    sentMessageToMqtt();
  }
)
$("#suspendButton").click(
  function save_devs_for_app(done) {
    sentSuspendMessageToMqtt();
  }
)


/*
 ***this is support for mqtt
 */
//send_by_mqtt('ashj67as', 'hello world');

function send_by_mqtt(token, message) {
  if (this.context == undefined) {
    this.context = create_mqtt_context(token, message);
    this.context.get('client').connect(context.get('options'));
  } else if (this.context.get('conn')) {
    send(this.context, this.context.get('topic'), message);
  }
}

// called when a message arrives


function create_mqtt_context(token, message) {
  var map = init_default_config(token);
  map.set('mqtt_client_id', generate16bitstr());
  var client = new Paho.MQTT.Client(map.get('mqtt_hostname'), map.get('mqtt_port'), map.get('mqtt_client_id'));
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  map.set('client', client);
  var options = {
    invocationContext: {
      host: map.get('mqtt_hostname'),
      port: map.get('mqtt_port'),
      clientId: map.get('mqtt_client_id')
    },
    timeout: 5,
    keepAliveInterval: 60,
    cleanSession: true,
    useSSL: false,
    //reconnect: true,
    onSuccess: onConnect,
    onFailure: onConnectionLost,
    mqttVersion: 4
  };
  //set password
  options.userName = map.get('mqtt_username');
  options.password = map.get('mqtt_password');
  map.set('options', options);
  //subscribe
  function onConnect() {
    map.set('client', client);
    map.set('conn', true);
    var topic = map.get('topic');
    map.get('client').subscribe("nodejs" + topic);
    this.context = map;
    send(this.context, topic, message);
  }
  return map;
}

function init_default_config(token) {
  var default_config = [
    ['mqtt_hostname', 'mqtt.jimus.io'],
    ['mqtt_port', 8083],
    ['mqtt_username', 'kr'],
    ['mqtt_password', 'KillRed666@@@'],
    ['trytimes', 3],
    ['conn', false],
    ['topic', token]
  ];
  return new Map(default_config);
}

//Generate 16bit string
function generate16bitstr() {
  var str = "";
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (var i = 0; i < 16; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  if (this.context != undefined) {
    this.context.set('conn', false);
  }
}

function send(context, topic, message) {
  message = new Paho.MQTT.Message(message);
  message.destinationName = "javascript" + topic;
  context.get('client').send(message);
}
