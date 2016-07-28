import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Models from '../models';

moduleForComponent('card-set-item', 'Integration | Component | card set item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  let cardset = Models.cardset;
  this.set('cardset', cardset);

  this.render(hbs`
      {{card-set-item cardset=cardset}}
  `);
  assert.equal(this.$('.set-name').text().trim(), cardset.name);
  assert.equal(this.$('.card-count').text().trim(), cardset.cardCount + ' cards');
});

//actions, which in this case involve Ember Data, need to be acceptance tests