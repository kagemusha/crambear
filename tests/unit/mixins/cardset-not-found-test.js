import Ember from 'ember';
import CardsetNotFoundMixin from '../../../mixins/cardset-not-found';
import { module, test } from 'qunit';

module('Unit | Mixin | card set not found');

// Replace this with your real tests.
test('it works', function(assert) {
  var CardsetNotFoundObject = Ember.Object.extend(CardsetNotFoundMixin);
  var subject = CardsetNotFoundObject.create();
  assert.ok(subject);
});
