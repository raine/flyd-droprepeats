var flyd = require('flyd');
var stream = flyd.stream;
var dropRepeats = require('../');
var R = require('ramda');
var assert = require('chai').assert;

var collect = flyd.scan(R.flip(R.append), []);

describe('dropRepeats', function() {
  it('drops consecutive repeated values', function() {
    var s = stream();
    var all = collect(dropRepeats(s));
    s(1)(2)(2)(3);
    assert.deepEqual(all(), [1, 2, 3]);
  });

  it('doesn\'t determine equality by value', function() {
    var s = stream();
    var all = collect(dropRepeats(s));
    s({ foo: 'bar' });
    s({ foo: 'bar' });
    assert.deepEqual(all(), [
      { foo: 'bar' },
      { foo: 'bar' },
    ]);
  });

  it('takes an optional function for using custom equality logic', function() {
    var s = stream();
    var all = flyd.scan(R.flip(R.append), [], dropRepeats(R.equals, s));
    s({ foo: 'bar' });
    s({ foo: 'bar' });
    assert.deepEqual(all(), [
      { foo: 'bar' }
    ]);
  });
});
