import Ember from 'ember';

export default Ember.Component.extend({
  cardSet: null,
  onInserted: function(){
    let cardSet = this.get('cardSet');
    cardSet.get('store').createRecord('card', {cardSet: cardSet});
  }.on('didInsertElement'),

  onWillDestroy: function(){
    let cards = this.get('cardSet.cards');
    let newCards = cards.filter((card)=>{
      return card.get('isNew');
    });
    newCards.forEach((card)=>{
      card.unloadRecord();
    });
  }.on('willDestroyElement'),

  actions: {
    addCard(){
      this.sendAction('addCard');
    },
    saveCard(card){
      this.sendAction('saveCard', card);
    },
  }
});
