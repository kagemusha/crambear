import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.store.find("cardSet", {public: true});
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set("publicSets", model);
  }
});
