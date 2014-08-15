import { test, moduleForModel } from 'ember-qunit';

moduleForModel('card-set', 'CardSet', {
  // Specify the other units that are required for this test.
  needs: ['model:card']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
