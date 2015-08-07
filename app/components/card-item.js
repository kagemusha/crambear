import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  card: null,

  click: function(){
    let card = this.get('card');
    if (!card.get('belongsToCurrentUser')){
      return;
    }
    card.set('isBeingEdited', true);
  },
  actions: {
    deleteCard(card) {
      card.destroyRecord();
    },
    saveCard(card) {
      this.sendAction('saveCard', card);
    },
  }
});
