# ember-data-query-first

Conveniently get the first item of a `store.query()`.

If you are querying your adapter and an array is returned, but you only need
the first entry:

```js
// GET /users?email=urbi@orbi.com
// {
//   data: [{
//     type: "user",
//     id: 1,
//     attributes: {
//       email: "urbi@orbi.com"
//     }
//   }]
// }
store.queryFirst('user', { email: 'urbi@orbi.com' }).then(function(user) {
  console.log(`ID of the user: ${user.get("id")}`);
});
```

which is equivalent to:

```js
store.query('user', { email: 'urbi@orbi.com' }).then(function(users) {
  return users.get("firstObject");
}).then(function(user) {
  console.log(`ID of the user: ${user.get("id")}`);
});
```

---

Note on `store.queryRecord()`:

`store.queryRecord()` should be used when a single record is requested and the
`id` is not known beforehand. `store.queryRecord` is most likely used with a
custom implementation of `urlForQueryRecord` ond the adapter:

```js
// app/adapters/user.js
import Adapter from './application';

export default Adapter.extend({

  urlForQueryRecord(query) {
    if (query.current) {
      return '/current_user';
    }

    return this._super(...arguments);
  }

});

// GET /current_user
// {
//   data: {
//     type: "user",
//     id: 1,
//     attributes: {
//       email: "urbi@orbi.com"
//     }
//   }
// }
store.queryRecord('user', { current: true }).then(function(currentUser) {
  console.log(`ID of current user: ${currentUser.get("id")}`);
});
```

# Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
