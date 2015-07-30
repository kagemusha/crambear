import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('cardSet', params.card_set_id);
  },

  actions: {
    gotoCardsetPage(cardSet){
      this.transitionTo('card-set', cardSet );
    }
  }
});
