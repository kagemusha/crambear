import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('autosave-textarea', 'Integration | Component | autosave textarea', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{autosave-textarea}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#autosave-textarea}}
      template block text
    {{/autosave-textarea}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
