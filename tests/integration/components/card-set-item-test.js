import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Models from '../models';

moduleForComponent('card-set-item', 'Integration | Component | card set item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  let cardSet = Models.cardSet;
  this.set('cardSet', cardSet);

  this.render(hbs`
      {{card-set-item cardSet=cardSet}}
  `);
  assert.equal(this.$('.set-name').text().trim(), cardSet.name);
  assert.equal(this.$('.card-count').text().trim(), cardSet.cardCount + ' cards');
});

//actions, which in this case involve Ember Data, need to be acceptance tests