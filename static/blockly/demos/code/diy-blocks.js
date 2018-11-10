var gUserServices = {}
var gUserStates = {}
var token;
var locationPath = window.location;
var path = locationPath.href;
var splitPath = path.split("=")[1];
var operation2String = {
  'EQ': '==',
  'NEQ': '!==',
  'GTE': '>=',
  'GT': '>',
  'LSE': '<=',
  'LS': '<'
}
var mqttMessageTimeoutMS = 3000
var mqttMsgTimer
var mqttGotStatesMsg
var mqttGotServicesMsg

getMQTTToken()
connectMQTT()

function getMQTTToken() {
  $.ajaxSettings.async = false;
  $.post('../../../../user/getToken.action', function (r, s) {
    token = r;
  });
  $.ajaxSettings.async = true;
}

function connectMQTT() {
  // context store mqtt connection.
  if (this.context == undefined) {
    this.context = create_mqtt_context(token);
  }
}

function getDevices(token) {
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

function updateUserServices(services) {
  gUserServices = services
}

function load_defalut_hass_standard_blocks(hass_dev) {
  add_device_block();
  add_state_blocks();
  add_trigger_block();
  if (Object.keys(gUserServices).length > 0 && $('#toolbox').find('#service_ctg_id').length <= 0) {
    $('<category id="" name="" colour="16"></category>').attr('name', "Service").attr('id', 'service_ctg_id').appendTo($('#toolbox'));
  }
  for (key in gUserServices) {
    add_service_block(gUserServices[key])
  }
  load_devs_for_app();
  Code.init();
}

function isNumber(nubmer) {
  var re = /^[0-9]+.?[0-9]*/;
  if (re.test(nubmer)) {
    return true
  } else {
    return false
  }
}

function removeQuotationMark(string) {
  if ((string[0] == `'`) || (string[0] == `"`)) {
    return string.substring(1, string.length-1)
  }
  return string
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

  if (Blockly.Blocks[domain]) {
    return
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
  if (Blockly.Blocks['trigger_framework']) {
    return
  }
  Blockly.Blocks['trigger_framework'] = {
    init: function () {
      this.appendDummyInput().appendField('If')
      this.appendValueInput("entity_id").setCheck("String");
      this.appendDummyInput().appendField(`device's`);
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('state'), 'stateName');
      this.appendDummyInput().appendField("value");
      this.appendDummyInput().appendField("from");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(
        [
          ['＝', 'EQ'],
          ['≠', 'NE'],
          ['≥', 'GE'],
          ['>', 'GT'],
          ['≤', 'LE'],
          ['<', 'LT']
        ]),'old_val_opt');
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('old'), 'from');
      this.appendDummyInput().appendField("to");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(
        [
          ['＝', 'EQ'],
          ['≠', 'NE'],
          ['≥', 'GE'],
          ['>', 'GT'],
          ['≤', 'LE'],
          ['<', 'LT']
        ]),'new_val_opt');
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('new'), 'to');
      this.appendDummyInput().appendField(`last`);
      this.appendDummyInput().appendField(new Blockly.FieldNumber('0', 0, 65535), 'last_s');
      this.appendDummyInput().appendField(`s`);
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
    var value_from_opt = block.getFieldValue('old_val_opt')
    var value_from = block.getFieldValue('from')
    var value_to_opt = block.getFieldValue('new_val_opt')
    var value_to = block.getFieldValue('to')
    var last_s = block.getFieldValue('last_s')
    var StatementCode = Blockly.JavaScript.statementToCode(block, 'DO')

    if (value_from != null) {
      if (value_from_opt === 'EQ') {
        if (!isNumber(value_from)) {
          value_from = `'${value_from}', `
        } else {
          value_from = `${value_from}, `
        }
      } else {
        if (!isNumber(value_from)) {
          value_from = `{operator: '${value_from_opt}', value: '${value_from}'}, `
        } else {
          value_from = `{operator: '${value_from_opt}', value: ${value_from}}, `
        }
      }
    }

    if (value_to != null) {
      if (value_to_opt === 'EQ') {
        if (!isNumber(value_to)) {
          value_to = `'${value_to}', `
        } else {
          value_to = `${value_to}, `
        }
      } else {
        if (!isNumber(value_to)) {
          value_to = `{operator: '${value_to_opt}', value: '${value_to}'}, `
        } else {
          value_to = `{operator: '${value_to_opt}', value: ${value_to}}, `
        }
      }
    }

    var last_ms = last_s*1000
    var code = `
await state_trigger.subscribe(APPID, '${value_entity_id}', '${value_name}', ${value_from}${value_to}${last_ms}, async () => {
  ${StatementCode}
})`;
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
  if (Blockly.Blocks['read_state']) {
    return
  }
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

    var code = `await state.get('${value_entity_id}', '${value_state_name}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  var blk = $('<block></block>').attr('type', 'read_state');
  if ($('#toolbox').find('#state_ctg_id').length <= 0) {
    $('<category id="" name="" colour="60"></category>').attr('name', "States").attr('id', 'state_ctg_id').appendTo($('#toolbox'));
  }
  $('#toolbox').find('#state_ctg_id').append(blk);
}

function add_read_state_compare_block() {
  if (Blockly.Blocks['read_state_compare']) {
    return
  }
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
await state.compare('${value_entity_id}', '${value_state_name}', '${value_state_opt}', ${value_state_value}, async () => {
  ${StatementCode}
})
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

function add_service_block(service) {
  var ds = service.domain + "." + service.service;
  var msgIndex = 1
  var serviceFormatedJson = {
    "type": `${ds}_formated`,
    "message0": `${service.service}%1`,
    "args0": [{"type":"input_dummy"}]
  }
  if (Blockly.Blocks[ds]) {
    return
  }
  for (var key in service.fields) {
    serviceFormatedJson[`message${msgIndex}`] = `${key} %1`
    var type = "String";
    if (Number.isInteger(service.fields[key].example)) {
      type = "Number";
    }
    serviceFormatedJson[`args${msgIndex}`] = [{
      "type": "input_value", 
      "name": key,
      "check": type
    }]
    msgIndex++
  }
  serviceFormatedJson["colour"] = 16
  if (JSON.stringify(service.fields) === '{}') {
    serviceFormatedJson[`message${msgIndex}`] = `data %1`
    serviceFormatedJson[`args${msgIndex}`] = [{
      "type": "input_value", 
      "name": "service_data",
      "check": "String"
    }]
    serviceFormatedJson["colour"] = 48
  }
  serviceFormatedJson["previousStatement"] = null
  serviceFormatedJson["nextStatement"] = null
  serviceFormatedJson["inputsInline"] = false
  serviceFormatedJson["mutator"] = `${ds}_mutator`


  Blockly.defineBlocksWithJsonArray([{
    "type": `${ds}_raw`,
    "message0": `${service.service}%1`,
    "args0": [{"type":"input_dummy"}],
    "message1": `service data %1`,
    "args1": [{"type":"input_value", "name": "service_data", "check": "String"}],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": false,
    "colour": 16
  }])

  var service_mixin = {
    mutationToDom: () => {},
    domToMutation: (xmlElement) => {}
  }

  Blockly.Extensions.registerMutator(`${ds}_mutator`,
    service_mixin, null,
    [`${ds}_raw`]);

  Blockly.Blocks[ds] = {
    init: function () {
      this.jsonInit(serviceFormatedJson);
    }
  };
  Blockly.JavaScript[ds] = function (block) {
    var code = `await service.call('${service.domain}', '${service.service}'`;

    // Call service data must be json format
    var serviceData = {}
    if (JSON.stringify(service.fields) !== '{}') {
      $.each(service.fields, function (key, value) {
        let c = Blockly.JavaScript.valueToCode(block, key, Blockly.JavaScript.ORDER_NONE);
        // If c is not set, c will be "". It's weird
        if (c) {
          if (isNumber(c)) {
            serviceData[key] = c
          } else {
            serviceData[key] = removeQuotationMark(c)
          }
        }
      });
    } else {
      // service.fields is {}, this is invalid Hass server config.
      // Just read serviceData as json string
      let d = Blockly.JavaScript.valueToCode(block, 'service_data', Blockly.JavaScript.ORDER_NONE)

      d = removeQuotationMark(d)
      serviceData = JSON.parse(d)
    }

    var serviceDataString = JSON.stringify(serviceData)
    code = `${code}, ${serviceDataString})\n`;
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




function load_devs_for_app() {
  $.post('../../../../application/selectAppById.action', {
    "appid": splitPath
  }, function (r, s) {
    recover_blockly(r);
  });
}

/*
 ***this is support for mqtt
 */
function send_by_mqtt(token, message) {
  function send(context, topic, message) {
    message = new Paho.MQTT.Message(message);
    message.destinationName = "javascript" + topic;
    context.get('client').send(message);
  }

  if (this.context.get('conn')) {
    send(this.context, this.context.get('topic'), message);
  } else {
    console.error('MQTT connection dose not established.')
  }
}

function create_mqtt_context(token) {
  function onConnect() {
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // This topic is only for Legacy KR.
    client.subscribe(`nodejs${token}`);

    client.subscribe(`${token}/states`)
    client.subscribe(`${token}/services`)
    map.set('client', client);
    map.set('conn', true);
    this.context = map;

    // Read user's devices and services
    getDevices(token)
  }
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.error("onConnectionLost:" + responseObject.errorMessage);
    }
    if (this.context != undefined) {
      this.context.set('conn', false);
    }
  }
  function onMessageArrived(message) {
    function handleMessageArrive() {
      var hassDev
      msgTimer = null
      if (!mqttGotStatesMsg && (topic == `${token}/states`)) {
        mqttGotStatesMsg = true
        hassDev = JSON.parse(payloadString)
        updateUserStates(hassDev)
      } else if (!mqttGotServicesMsg && (topic == `${token}/services`)) {
        mqttGotServicesMsg = true
        updateUserServices(JSON.parse(payloadString))
      } else if (!mqttGotStatesMsg && !mqttGotServicesMsg && (topic == `nodejs${token}`)) {
        mqttGotStatesMsg = true
        mqttGotServicesMsg = true
        let hass_data = JSON.parse(message.payloadString)
        hassDev = hass_data.states
        updateUserStates(hassDev)
        updateUserServices(hass_data.services)
      } else {
        console.error(`invalid message.`)
        return
      }

      if (hassDev) {
        load_defalut_hass_standard_blocks(hassDev);
      }
    }
    var topic = message.destinationName
    var retained = message.retained
    var payloadString = message.payloadString
    if (retained) {
      // Handler retained message only wait non-retained message timeout.
      msgTimer = setTimeout(handleMessageArrive, mqttMessageTimeoutMS)
    } else {
      if (msgTimer) {
        console.log('Clear retained message handler')
        clearTimeout(msgTimer)
      }
      handleMessageArrive()
    }
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

  var map = init_default_config(token);
  map.set('mqtt_client_id', generate16bitstr());
  var client = new Paho.MQTT.Client(map.get('mqtt_hostname'), map.get('mqtt_port'), map.get('mqtt_client_id'));
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
    mqttVersion: 4,
    //set password
    userName: map.get('mqtt_username'),
    password: map.get('mqtt_password'),
  };
  map.set('options', options);
  client.connect(options);
  return map;
}


// Button handlers
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
$("#runButton").click(
  function save_devs_for_app(done) {
    var msg = {}
    msg["type"] = "callService"
    msg["comContent"] = {}
    msg["comContent"]["appid"] = parseInt(splitPath, 10)
    msg["comContent"]["code"] = trans2javascript()
    msg["comContent"]["status"] = "running"
    send_by_mqtt(token, JSON.stringify(msg))
  }
)
$("#suspendButton").click(
  function save_devs_for_app(done) {
    var msg = {}
    msg["type"] = "callService"
    msg["comContent"] = {}
    msg["comContent"]["appid"] = parseInt(splitPath, 10)
    msg["comContent"]["status"] = "suspend"
    send_by_mqtt(token, JSON.stringify(msg))
  }
)
