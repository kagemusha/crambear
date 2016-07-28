import Ember from 'ember';
import CardsetNotFound from 'crambear/mixins/cardset-not-found';

export default Ember.Route.extend(CardsetNotFound, {

  model(params) {
    return this.store.findRecord('cardset', params.card_set_id);
  },

  actions: {
    gotoCardsetPage(cardset) {
      this.transitionTo('cardset', cardset );
    }
  }
});
