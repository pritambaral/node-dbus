var DBus = require('../');

var dbus = new DBus();

var bus = dbus.getBus('session');

bus.getInterface('nodejs.dbus.ExampleService', '/nodejs/dbus/ExampleService', 'nodejs.dbus.ExampleService.Interface1', function(err, iface) {

	iface.Equal(function(err, result) {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
		}
	}, 1000);

});
