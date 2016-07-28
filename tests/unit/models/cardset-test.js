import { test, moduleForModel } from 'ember-qunit';

moduleForModel('cardset', 'Cardset', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:card', 'model:tag']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(model);
});
