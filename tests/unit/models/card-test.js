import { test, moduleForModel } from 'ember-qunit';
moduleForModel('card', 'Card', {
  needs: ['model:card-set']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(model);
});

