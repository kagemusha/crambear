import { test, moduleForModel } from 'ember-qunit';
moduleForModel('card', 'Card', {
  needs: ['model:card-set']
});

test('it exists', function() {
  var model = this.subject();
  ok(model);
});

