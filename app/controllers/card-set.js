import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),
  showCardEditor: false,
  card: null,

  actions: {
    addCard(){
      let newCard = this.store.createRecord("card", {
        isBeingEdited: true,
      });
      this.set('card', newCard);
      this.toggleProperty('showCardEditor');
    },
    saveNewCard(){
      let card = this.get('card');
      card.set('cardSet', this.get('model'))
      card.save().then((card)=>{
        card.set('isBeingEdited', false);
        let newCard = this.store.createRecord("card", {
          isBeingEdited: true,
        });
        this.set('card', newCard);
      }).catch((reason)=>{
        //TODO: don't show until created
        card.rollback();
      })
    },
  }
});
