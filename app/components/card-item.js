import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  card: null,

  showDeleteButton: Ember.computed('card.belongsToCurrentUser', 'card.isNew', function(){
    //and css set so that delete button only shows when hovering over this card-item
    return this.get('card.belongsToCurrentUser') && !this.get('card.isNew');
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
