import { test, moduleFor } from 'ember-qunit';

moduleFor('route:index', 'IndexRoute', {
  //needs: ['model:card-set']
});

test('it exists', function(assert) {
  //wait till this problem resolved: https://github.com/rwjblue/ember-qunit/issues/84
  assert.expect(1);
  var route = this.subject();
  assert.ok(route);
});
