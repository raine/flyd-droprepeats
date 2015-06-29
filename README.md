# flyd-droprepeats

Drops consecutively repeated values from a
[Flyd](https://github.com/paldepind/flyd) stream.

__Usage__

```js
var append = function(arr, x) {
  return arr.concat(x);
};

var s = flyd.stream();
var noRepeats = dropRepeats(s);
var collect = flyd.scan(append, [], noRepeats);
s(1)(2)(2)(3);
collect() // [1, 2, 3]
```

Optionally takes a function argument before the stream that will be used to
determine equality.

```js
// Ramda's `equals` determines equality by value
var s = flyd.stream();
var noRepeats = dropRepeats(R.equals, s);
var collect = flyd.scan(append, [], noRepeats);
s({ foo: 'bar' });
s({ foo: 'bar' });
collect() // [{ foo: 'bar' }]
```
