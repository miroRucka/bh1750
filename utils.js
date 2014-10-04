var _ = require('lodash');

module.exports = function () {

    var _exists = function (input) {
        return !_.isUndefined(input) && !_.isNull(input);
    };

    return {
        exists: _exists
    }
}();