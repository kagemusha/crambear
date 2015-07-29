import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('autosave-input', 'Integration | Component | autosave input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  let value='莫名其妙';
  this.set('value', value);
  this.render(hbs`{{autosave-input value=value}}`);
  assert.equal(this.$('input').val(), value);

  // todo: Handle any actions with this.on('myAction', function(val) { ... });
});
