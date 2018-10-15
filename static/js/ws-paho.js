connect_mqtt('world');

function connect_mqtt(token){
	 var map = create_mqtt_context(token);
	 map.get('client').connect(map.get('options'));
	 return map;
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

function send_by_mqtt(context, message){
	message = new Paho.MQTT.Message(message);
    message.destinationName = context.get('topic');
    context.get('client').send(message);
}

function create_mqtt_context(token){
	var map = init_default_config(token);
	map.set('mqtt_client_id', generate16bitstr());
    var client = new Paho.MQTT.Client(map.get('mqtt_hostname'), map.get('mqtt_port'), map.get('mqtt_client_id'));
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
	map.set('client', client);
	var options = {
		invocationContext: { host: map.get('mqtt_hostname'), 
			port: map.get('mqtt_port'),  clientId: map.get('mqtt_client_id') },
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
	function onConnect(){
		var topic = map.get('topic');
		map.get('client').subscribe(topic);
	}
	return map;
}

function init_default_config(token){
	var default_config = [['mqtt_hostname', 'gcloud.schumyhao.xyz'],
		['mqtt_port', 8083],
		['mqtt_username', 'kr'],
		['mqtt_password', 'KillRed666@@@'],
		['trytimes', 3],
		['topic', token]];
	return new Map(default_config);
}

//Generate 16bit string
function generate16bitstr(){
    var str = "";
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for(var i=0; i<16; i++){
        var pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
