import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('autosave-textarea', 'Integration | Component | autosave textarea', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  let value='影武者';
  this.set('value', value);
  this.render(hbs`{{autosave-textarea value=value}}`);
  assert.equal(this.$('textarea').val(), value);

  // todo: Handle any actions with this.on('myAction', function(val) { ... });

});
