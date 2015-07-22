import { test, moduleFor } from 'ember-qunit';

moduleFor('route:study', 'StudyRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  assert.expect(1);
  var route = this.subject();
  assert.ok(route);
});
