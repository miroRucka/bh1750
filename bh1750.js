var console = require('console');

var i2c = null;
try {
  i2c = require('@abandonware/i2c');
} catch(err) {
  i2c = require('i2c');
}

var BH1750 = function (opts) {
    this.options = opts || {
        address: 0x23,
        bus: 1,
        device: '/dev/i2c-1',
        command: 0x10,
        length: 2
    };
    this.verbose = this.options.verbose || false;
    if (i2c.openSync) {
        this.wire = i2c.openSync(this.options);
     } else {
        this.wire = new i2c(this.options.address, {device: this.options.device});
     }
    if (!this.wire.readBytes) {
        this.wire.readBytes = function(offset, len, callback) {
            this.writeSync([offset]);
            this.read(len, function(err, res) {
                callback(err, res);
            });
        }
    }
};

BH1750.prototype.readLight = function (cb) {
    var self = this;
    if (!cb) {
        throw new Error("Invalid param");
    }
    self.wire.readBytes(self.options.command, self.options.length, function (err, res) {

        if (err) {
            if (self.verbose)
                console.error("error: I/O failure on BH1750 - command: ", self.options.command);
            return cb(err, null);
        }
        var hi = res[0];
        var lo = res[1];
        if (Buffer.isBuffer(res)) {
           hi = res.readUInt8(0);
           lo = res.readUInt8(1);
        }

        var lux = ((hi << 8) + lo)/1.2;
        if (self.options.command === 0x11) {
            lux = lux/2;
        }
        cb(null, lux);
    });
};

module.exports = BH1750;
