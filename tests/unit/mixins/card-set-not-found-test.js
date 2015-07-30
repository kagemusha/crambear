import Ember from 'ember';
import CardSetNotFoundMixin from '../../../mixins/card-set-not-found';
import { module, test } from 'qunit';

module('Unit | Mixin | card set not found');

// Replace this with your real tests.
test('it works', function(assert) {
  var CardSetNotFoundObject = Ember.Object.extend(CardSetNotFoundMixin);
  var subject = CardSetNotFoundObject.create();
  assert.ok(subject);
});
