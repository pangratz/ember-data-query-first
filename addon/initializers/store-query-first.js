import Ember from 'ember';
import DS from 'ember-data';

const { get } = Ember;
const { Store } = DS;

export function initialize() {

  Store.reopen({

    queryFirst() {
      return this.query(...arguments).then(function(result) {
        return get(result, 'firstObject') || null;
      });
    }

  });

}

export default {
  name: 'ember-data-store-query-first',
  initialize
};
