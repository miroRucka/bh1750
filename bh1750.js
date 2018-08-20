var i2c = require('i2c');
var _ = require('lodash');
var utils = require('./utils');

var BH1750 = function (opts) {
    this.options = _.extend({}, {
        address: 0x23,
        device: '/dev/i2c-1',
        command: 0x10,
        length: 2
    }, opts);
    this.verbose = this.options.verbose || false;
    this.wire = new i2c(this.options.address, {device: this.options.device});
};

BH1750.prototype.readLight = function (cb) {
    var self = this;
    if (!utils.exists(cb)) {
        throw new Error("Invalid param");
    }
    self.wire.readBytes(self.options.command, self.options.length, function (err, res) {
        if (utils.exists(err)) {
            if (self.verbose)
                console.error("error: I/O failure on BH1750 - command: ", self.options.command);
            return cb(err, null);
        }
        var hi = res.readUInt8(0);
        var lo = res.readUInt8(1);
        var lux = ((hi << 8) + lo)/1.2;
        if (self.options.command === 0x11) {
            lux = lux/2;
        }
        cb(null, lux);
    });
};

module.exports = BH1750;
