var flyd = require('flyd');

module.exports = function(eq, s) {
  if (flyd.isStream(eq)) {
    s  = eq;
    eq = strictEq;
  }

  var prev;
  return flyd.stream([s], function(self) {
    if (!eq(s.val, prev)) {
      self(s.val);
      prev = s.val;
    }
  });
};

function strictEq(a, b) {
  return a === b;
}
