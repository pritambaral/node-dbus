"use strict";

var util = require('util');
var events = require('events');

var Interface = module.exports = function(bus, serviceName, objectPath, interfaceName, obj) {
	var self = this;

	self.bus = bus;
	self.serviceName = serviceName;
	self.objectPath = objectPath;
	self.interfaceName = interfaceName;
	self.object = obj;
};

util.inherits(Interface, events.EventEmitter);

Interface.prototype.init = function(callback) {
	var self = this;

	// Initializing methods
	for (var methodName in self.object['method']) {

		self[methodName] = (function(method, signature) {

			return function() {
				var args, timeout, handler;
				var ult = arguments[arguments.length -1], penult = arguments[arguments.length -2]
				if (typeof penult == 'function' && typeof ult == 'number') {
					args = Array.prototype.slice.call(arguments, 0, -2);
					handler = penult;
					timeout = ult;
				} else if (typeof ult == 'function') {
					args = Array.prototype.slice.call(arguments, 0, -1);
					handler = ult;
					timeout = -1;
				} else {
					args = Array.prototype.slice.call(arguments);
					handler = function(){};
					timeout = -1;
				}

				process.nextTick(function() {

					try {
						self.bus.dbus.callMethod(self.bus.connection,
							self.serviceName,
							self.objectPath,
							self.interfaceName,
							method,
							signature,
							timeout,
							args,
							handler);
					} catch(e) {
						handler(e, null);
					}
				});
			};
		})(methodName, self.object['method'][methodName]['in'].join('') || '');
	}

	// Initializing signal handler
	var signals = Object.keys(self.object['signal']);
	if (signals.length) {
		self.bus.registerSignalHandler(self.serviceName, self.objectPath, self.interfaceName, self, function() {

			if (callback)
				process.nextTick(callback);
		});

		return;
	}

	if (callback)
		process.nextTick(callback);
};

Interface.prototype.setProperty = function(propertyName, value, callback) {
	var self = this;

	self.bus.dbus.callMethod(self.bus.connection,
		self.serviceName,
		self.objectPath,
		'org.freedesktop.DBus.Properties',
		'Set',
		'ssv',
		-1,
		[ self.interfaceName, propertyName, value ],
		function(err) {

			if (callback)
				callback(err);
		});
};

Interface.prototype.getProperty = function(propertyName, callback) {
	var self = this;

	self.bus.dbus.callMethod(self.bus.connection,
		self.serviceName,
		self.objectPath,
		'org.freedesktop.DBus.Properties',
		'Get',
		'ss',
		10000,
		[ self.interfaceName, propertyName ],
		function(err, value) {

			if (callback)
				callback(err, value);
		});
};

Interface.prototype.getProperties = function(callback) {
	var self = this;

	self.bus.dbus.callMethod(self.bus.connection,
		self.serviceName,
		self.objectPath,
		'org.freedesktop.DBus.Properties',
		'GetAll',
		's',
		-1,
		[ self.interfaceName ],
		function(err, value) {

			if (callback)
				callback(err, value);
		});
};
