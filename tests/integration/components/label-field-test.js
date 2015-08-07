import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('label-field', 'Integration | Component | label field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let label={name: 'レーベル'};
  this.set('label', label);
  this.render(hbs`{{label-field label=label}}`);
  assert.equal(this.$('input').val(), label.name);
});
