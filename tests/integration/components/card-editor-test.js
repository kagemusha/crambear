import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Models from '../models';


moduleForComponent('card-editor', 'Integration | Component | card editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  let card = Models.card;
  this.set('card', card);
  this.render(hbs`{{card-editor card=card}}`);
  assert.equal(this.$('textarea:first').val(), card.front);
  assert.equal(this.$('textarea:last').val(), card.back);

  //todo: actions

});
