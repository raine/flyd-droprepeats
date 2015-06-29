# flyd-droprepeats

Drops consecutively repeated values from a
[Flyd](https://github.com/paldepind/flyd) stream.

__Usage__

```js
var s = flyd.stream();
var append = function(arr, x) {
  return arr.concat(x);
};

var noRepeats = flyd.scan(append, [], dropRepeats(s));
s(1)(2)(2)(3);
noRepeats() // [1, 2, 3]
```

Optionally takes a function argument before the stream that will be used to
determine equality.

```js
// Ramda's `equals` determines equality by value
var s = flyd.stream();
var noRepeats = flyd.scan(append, [], dropRepeats(R.equals, s));
s({ foo: 'bar' });
s({ foo: 'bar' });
noRepeats() // [{ foo: 'bar' }]
```
