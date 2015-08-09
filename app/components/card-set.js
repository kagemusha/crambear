import Ember from 'ember';
const NEW_CARD_FRONT_SELECTOR = 'ul li:last textarea:first';

export default Ember.Component.extend({
  shouldShowNewTagModal: false,
  newTagName: null,
  cardSet: null,
  selectedTag: null,
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
      this.sendAction('study', this.get('cardSet'));
    }
  }
});
