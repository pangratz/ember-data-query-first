import Ember from 'ember';
import startApp from '../helpers/start-app';
import { moduleFor, test } from 'ember-qunit';

const { typeOf } = Ember;
const { RSVP: { resolve, reject } } = Ember;

moduleFor('service:store', 'DS.Store#queryFirst()', {
  integration: true,

  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('is a method on the store', function(assert) {
  let queryFirst = this.subject().queryFirst;
  assert.equal(typeOf(queryFirst), 'function');
});

test('resolves with first entry', function(assert) {
  this.subject().adapterFor('user').reopen({
    query() {
      return resolve({
        data: [{ type: 'user', id: 'pope' }, { type: 'user', id: 123 }]
      });
    }
  });

  this.subject().queryFirst('user', { email: 'urbi@orbi.com' }).then(function(pope) {
    assert.equal(pope.get('id'), 'pope');
  });
});

test('is null when the array is empty', function(assert) {
  this.subject().adapterFor('user').reopen({
    query() {
      return resolve({
        data: []
      });
    }
  });

  this.subject().queryFirst('user', { email: '404@orbi.com' }).then(function(user) {
    assert.strictEqual(user, null);
  });
});

test('is null when the array is null', function(assert) {
  this.subject().adapterFor('user').reopen({
    query() {
      return resolve({
        data: []
      });
    }
  });

  this.subject().queryFirst('user', { email: '404@orbi.com' }).then(function(user) {
    assert.strictEqual(user, null);
  });
});

test('rejects when the query rejects', function(assert) {
  this.subject().adapterFor('user').reopen({
    query() {
      return reject();
    }
  });

  this.subject().queryFirst('user', { email: 'urbi@orbi.com' }).then(function() {
    assert.ok(false, 'should not resolve');
  }, function() {
    assert.ok(true);
  });
});
