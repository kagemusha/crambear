import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('cardSet', params.card_set_id);
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    return controller.reset();
  }
});
