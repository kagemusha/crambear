import { moduleForModel, test } from 'ember-qunit';

moduleForModel('tag', 'Unit | Model | tag', {
  // Specify the other units that are required for this test.
  needs: ['model:card-set', 'model:card']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});
