'use strict';

function base(_expression) {
    var expression = _expression || null;
}

base.prototype.is = function(string) {
  return this.expression.test(string);
};

base.prototype.match = function(string) {
    return this.expression.match(string);
};

module.exports = base;