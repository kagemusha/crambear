import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addCard() {
      this.store.createRecord('card', {
        cardSet: this.get('model'),
      });
    },
    saveCard(card) {
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
    saveNewLabel(name) {
      if (Ember.isBlank(name)){
        return;
      }
      let label = this.store.createRecord('label', {
        name: name,
        cardSet: this.get('model'),
      });
      this.send('saveLabel', label);
    },
    saveLabel(label) {
      if (Ember.isBlank(label.get('name'))) {
        return;
      }
      label.save().then(()=>{
        this.set('newLabelName', null);
      }).catch(()=>{
        alert('Error saving label');
      });
    },
    deleteLabel(label) {
      label.destroyRecord().catch(()=>{
        alert('Delete label failed');
      });
    },
    study(set) {
      this.transitionTo('study', set);
    }
  }
});
