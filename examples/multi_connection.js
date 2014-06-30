var DBus = require('../');

var dbus = new DBus();

var bus1 = dbus.getBus('session');

bus1.getInterface('nodejs.dbus.ExampleService', '/nodejs/dbus/ExampleService', 'nodejs.dbus.ExampleService.Interface1', function(err, iface) {

	iface.Hello(function(err, result) {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
		}
	}, 1000);

});

var bus2 = dbus.getBus('session');

bus2.getInterface('nodejs.dbus.ExampleService', '/nodejs/dbus/ExampleService', 'nodejs.dbus.ExampleService.Interface1', function(err, iface) {

	iface.Hello(function(err, result) {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
		}
	}, 1000);

});

