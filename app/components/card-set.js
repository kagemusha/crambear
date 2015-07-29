import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addCard(){
      this.sendAction('addCard');
    },
    saveCard(card){
      this.sendAction('saveCard', card);
    },
  }
});
