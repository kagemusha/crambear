import Ember from 'ember';
const NEW_CARD_FRONT_SELECTOR = 'ul li:last textarea:first';

export default Ember.Component.extend({
  shouldShowNewTagModal: false,
  newTagName: null,
  cardset: null,
  editable: Ember.computed.readOnly("cardset.belongsToCurrentUser"),
  selectedTag: null,
  onInserted: Ember.on('didInsertElement', function(){
    //if (this.get('editable')){
    //  let cardset = this.get('cardset');
    //  cardset.get('store').createRecord('card', {cardset: cardset});
    //}
  }),

  onWillDestroy: Ember.on('willDestroyElement', function(){
    let cards = this.get('cardset.cards');

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
    gotoNewCard() {
      this.$(NEW_CARD_FRONT_SELECTOR).focus();
    },
    saveCard(card) {
      this.sendAction('saveCard', card);
    },
    showNewTagModal() {
      this.set('shouldShowNewTagModal', true);
    },
    saveTag(tag) {
      this.sendAction('saveTag', tag);
    },
    deleteTag(tag) {
      this.sendAction('deleteTag', tag);
    },
    saveNewTag() {
      let name = this.get('newTagName');
      this.sendAction('saveNewTag', name);
      this.set('newTagName', null);
      this.set('shouldShowNewTagModal', false);
    },
    closeModal() {
      this.set('shouldShowNewTagModal', false);
    },
    study() {
      this.sendAction('study', this.get('cardset'));
    }
  }
});
