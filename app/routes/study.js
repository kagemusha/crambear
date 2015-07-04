import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('cardSet', params.card_set_id);
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    return controller.reset();
  }
});
