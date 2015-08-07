import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  card: null,

  disableDelete: Ember.computed('card.isNew', function(){
    return this.get('card.isNew');
  }),
  click: function(){
    let card = this.get('card');
    if (!card.get('belongsToCurrentUser')){
      return;
    }
    card.set('isBeingEdited', true);
  },
  actions: {
    deleteCard(card) {
      //seting isDisabled to false on delete btn
      //doesn't disable this event; seems bug in ember-cli-materialize
      if (!this.get('disableDelete')){
        card.destroyRecord();
      }
    },
    saveCard(card) {
      this.sendAction('saveCard', card);
    },
  }
});
