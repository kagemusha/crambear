import { moduleForModel, test } from 'ember-qunit';

moduleForModel('label', 'Unit | Model | label', {
  // Specify the other units that are required for this test.
  needs: ['model:card-set']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});