import Ember from 'ember';

export default Ember.Component.extend({
  shouldShowNewLabelModal: false,
  newLabelName: null,
  cardSet: null,
  onInserted: Ember.on('didInsertElement', function(){
    let cardSet = this.get('cardSet');
    cardSet.get('store').createRecord('card', {cardSet: cardSet});
  }),

  onWillDestroy: Ember.on('willDestroyElement', function(){
    let cards = this.get('cardSet.cards');

    //this can happen when logout while on this page
    if (!cards) {
      return;
    }

    let newCards = cards.filter((card)=>{
      return card.get('isNew');
    });
    newCards.forEach((card)=>{
      card.unloadRecord();
    });
  }),

  actions: {
    addCard() {
      this.sendAction('addCard');
    },
    saveCard(card) {
      this.sendAction('saveCard', card);
    },
    showNewLabelModal() {
      this.set('shouldShowNewLabelModal', true);
    },
    saveLabel(label) {
      this.sendAction('saveLabel', label);
    },
    deleteLabel(label) {
      this.sendAction('deleteLabel', label);
    },
    saveNewLabel() {
      let name = this.get('newLabelName');
      this.sendAction('saveNewLabel', name);
      this.set('newLabelName', null);
      this.set('shouldShowNewLabelModal', false);
    },
    closeModal() {
      this.set('shouldShowNewLabelModal', false);
    },
    study() {
      this.sendAction('study', this.get('cardSet'));
    }
  }
});
