import Ember from 'ember';

export default Ember.Component.extend({
  card: null,
  actions: {
    hideCardEditor(){
      this.set('card.isBeingEdited', false);
      return true;
    },
    saveCard(){
      var front = this.get('card.front');
      var back = this.get('card.back');
      if (Ember.isEmpty(front) || Ember.isEmpty(back)){
        alert('Front and back must be filled in');
        return;
      }
      this.sendAction('saveCard');
    }
  }
});
