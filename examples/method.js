var DBus = require('../');

var dbus = new DBus();

var bus = dbus.getBus('session');

bus.getInterface('nodejs.dbus.ExampleService', '/nodejs/dbus/ExampleService', 'nodejs.dbus.ExampleService.Interface1', function(err, iface) {

	iface.SendObject({
		name: 'Fred',
		email: 'cfsghost@gmail.com'
	}, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  }, 1000);

	// Blank object
	iface.SendObject({});

	// Testing method with no return value
	iface.Dummy(function(err, result) {
		console.log('Dummy')
	}, 1000);

	// Testing method with complex dictionary object
	iface.GetContacts(function(err, contacts) {
		if (err) {
			console.log(err)
		} else {
			console.log(contacts)
		}
	}, 1000);

	// Error handling
	iface.SendObject('Wrong arguments', function(err, result) {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
		}
	});
});
