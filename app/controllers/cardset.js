import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveCard(card) {
      let wasNewCard =  card.get('isNew');
      card.save().then((card)=>{
        card.set('isBeingEdited', false);
        if (wasNewCard){
          this.store.createRecord('card', {cardset: this.get('model')});
        }
      }).catch((error)=>{
        Ember.Logger.log(`Error saving card: ${error}`);
        //TODO: don't show until created
        card.rollback();
      });
    },
    saveNewTag(name) {
      if (Ember.isBlank(name)){
        return;
      }
      let tag = this.store.createRecord('tag', {
        name: name,
        cardset: this.get('model'),
      });
      this.send('saveTag', tag);
    },
    saveTag(tag) {
      if (Ember.isBlank(tag.get('name'))) {
        return;
      }
      tag.save().then(()=>{
        this.set('newTagName', null);
      }).catch(()=>{
        alert('Error saving tag');
      });
    },
    deleteTag(tag) {
      tag.destroyRecord().catch(()=>{
        alert('Delete tag failed');
      });
    },
    study(set) {
      this.transitionTo('study', set);
    }
  }
});
