# bh1750

light sensor BH1750 controlled by raspberry pi based on i2c lib

## Usage

### Code

   ```javascript
   var BH1750 = require('../bh1750');
   var light = new BH1750({
        //options
   });

   light.readLight(function(value){
        //..
   });
   ```

### Options

    {
        address: 0x23,
        device: '/dev/i2c-1',
        command: 0x10,
        length: 2
    }

#### Possible commands

     // No active state
     0x00

     // Wating for measurment command
     0x01

     // Reset data register value - not accepted in POWER_DOWN mode
     0x07

     // Start measurement at 1lx resolution. Measurement time is approx 120ms.
     0x10

     // Start measurement at 0.5lx resolution. Measurement time is approx 120ms.
     0x11

     // Start measurement at 4lx resolution. Measurement time is approx 16ms.
     0x13

     // Start measurement at 1lx resolution. Measurement time is approx 120ms.
     // Device is automatically set to Power Down after measurement.
     0x20

     // Start measurement at 0.5lx resolution. Measurement time is approx 120ms.
     // Device is automatically set to Power Down after measurement.
     0x21

     // Start measurement at 1lx resolution. Measurement time is approx 120ms.
     // Device is automatically set to Power Down after measurement.
     0x23

## License

(The MIT License)

Copyright (c) 2013 Christophe Hamerling &lt;christophe.hamerling@gmail.com&gt;

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