import Ember from 'ember';

export default Ember.Component.extend({
  card: null,
  classNames: ['card-editor'],
  actions: {
    hideCardEditor(){
      this.set('card.isBeingEdited', false);
      this.sendAction('hideCardEditor');
    },
    saveCard(){
      let card = this.get('card');
      let front = card.get('front');
      let back = card.get('back');
      if (Ember.isEmpty(front) && Ember.isEmpty(back)){
        alert('Front or back must be filled in');
        return;
      }
      this.sendAction('saveCard', card);
    }
  }
});
