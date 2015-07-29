import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('create-card-set-dialog', 'Integration | Component | create card set dialog', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-card-set-dialog}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#create-card-set-dialog}}
      template block text
    {{/create-card-set-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
