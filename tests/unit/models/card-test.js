import { test, moduleForModel } from 'ember-qunit';
moduleForModel('card', 'Card', {
  needs: ['model:card-set', 'model:tag']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(model);
});

