# node-dbus  
node-dbus is a D-Bus binding for Node.js.

## How To Build
To build, do: `node-gyp configure build`

## Usage

Check out the [Examples](../../tree/master/examples/)

### Extras

If `serviceName`, `objectPath` and `interfaceName` are similar:

```javascript
// serviceName = 'org.freedesktop.DBus'
// objectPath  = '/org/freedesktop/DBus'
// interfaceName = 'org.freedesktop.DBus'
bus.getInterface(serviceName, objectPath, interfaceName, cb)

// Is equivalent to
bus.getInterface(serviceName, cb)

/*  Essentially,
 *  interfaceName is copied from objectPath, if not present.
 *  objectPath is copied from serviceName, if not preset.
 *  objectPath in dot-url form is converted to path form
 *  "org.freedesktop.DBus" -> "/org/freedesktop/DBus"
 */
```

If `objectPath` or `interfaceName` are extensions of `serviceName`:

```javascript
// serviceName = 'org.freedesktop.NetworkManager'
// objectPath  = '/org/freedesktop/NetworkManager/Settings/0'
// interfaceName = 'org.freedesktop.NetworkManager.Settings.Connection'

bus.getInterface(serviceName, '.Settings.0', '.Settings.Connection', cb)

/* Essentially,
 * if interfaceName or objectPath begin with a dot, serviceName is
 * prepended
 */

```

The two can of course be combined:

```javascript
// serviceName = 'org.freedesktop.NetworkManager'
// objectPath  = '/org/freedesktop/NetworkManager/Agent'
// interfaceName = 'org.freedesktop.NetworkManager.Agent'

bus.getInterface(serviceName, '.Agent', cb)
```

## License 

(The MIT License)

Copyright (c) 2013

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

