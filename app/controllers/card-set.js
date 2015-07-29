import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addCard(){
      this.store.createRecord("card", {
        cardSet: this.get('model'),
      });
    },
    saveCard(card){
      let wasNewCard =  card.get('isNew');
      card.save().then((card)=>{
        card.set('isBeingEdited', false);
        if (wasNewCard){
          this.store.createRecord('card', {cardSet: this.get('model')});
        }
      }).catch((error)=>{
        Ember.Logger.log(`Error saving card: ${error}`);
        //TODO: don't show until created
        card.rollback();
      });
    },
  }
});
