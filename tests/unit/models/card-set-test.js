import { test, moduleForModel } from 'ember-qunit';

moduleForModel('card-set', 'CardSet', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:card', 'model:label']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(model);
});
