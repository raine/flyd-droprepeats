var flyd = require('flyd');

function dropRepeatsWith(eq, s) {
  var prev;
  return flyd.combine(function(s) {
    var current = s();
    if (!eq(current, prev)) {
      prev = current;
      return current;
    }
  }, [s]);
}

exports.dropRepeats = function(s) {
  return dropRepeatsWith(strictEq, s);
};

exports.dropRepeatsWith = flyd.curryN(2, dropRepeatsWith);

function strictEq(a, b) {
  return a === b;
}
