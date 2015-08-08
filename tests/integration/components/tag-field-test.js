import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('tag-field', 'Integration | Component | tag field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let tag={name: 'レーベル'};
  this.set('tag', tag);
  this.render(hbs`{{tag-field tag=tag}}`);
  assert.equal(this.$('input').val(), tag.name);
});
