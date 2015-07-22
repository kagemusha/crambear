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
    console.log("edit card");
  },
  actions: {
    deleteCard(card){
      card.deleteRecord();
      card.save();
    },
    saveCard(){
      let card = this.get('card');
      card.save().then((card)=>{
        card.set('isBeingEdited', false);
      }).catch(()=>{
        //TODO: don't show until created
        card.rollback();
      });
    },
  }
});
