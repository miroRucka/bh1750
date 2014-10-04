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
    this.wire = new i2c(this.options.address, {device: this.options.device});
};

BH1750.prototype.readLight = function (cb) {
    var self = this;
    if (!utils.exists(cb)) {
        console.error("missing callback");
        return;
    }
    this.wire.writeByte(this.options.command, function (err) {
        if (utils.exists(err)) {
            console.error("error write byte to BH1750 - command: ", self.options.command);
        }
    });
    this.wire.readBytes(this.options.command, this.options.length, function (err, res) {
        var hi = res.readUInt8(0);
        var lo = res.readUInt8(1);
        cb.call(self, ((hi << 8) + lo));
    });
};

module.exports = BH1750;
