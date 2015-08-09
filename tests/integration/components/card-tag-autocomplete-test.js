import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card-tag-autocomplete', 'Integration | Component | card tag autocomplete', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card-tag-autocomplete}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card-tag-autocomplete}}
      template block text
    {{/card-tag-autocomplete}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
