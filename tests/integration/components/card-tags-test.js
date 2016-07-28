import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Models from '../models';

moduleForComponent('card-tags', 'Integration | Component | card tags', {
  integration: true
});

let cardset = Models.cardset;
let card = cardset.cards[0];
let tags = cardset.tags;


test('unowned card tag renders', function(assert) {
  assert.expect(1);
  this.set('cardset', cardset);
  this.set('card', card);
  this.set('tags', tags);

  this.render(hbs`{{card-tags tags=tags card=card ownCard=false}}`);
  assert.equal(this.$('.static-card-tag').text().trim(), card.tags[0].name);
});


