import Ember from 'ember';
import CardSetNotFound from 'crambear/mixins/card-set-not-found';

export default Ember.Route.extend(CardSetNotFound, {

  model(params) {
    return this.store.findRecord('cardSet', params.card_set_id);
  },

  actions: {
    gotoCardsetPage(cardSet) {
      this.transitionTo('card-set', cardSet );
    }
  }
});
