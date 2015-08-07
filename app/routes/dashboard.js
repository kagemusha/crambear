import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),

  onActivate: Ember.on("activate", function(){
    this.transitionAway();
  }),
  transitionAway() {
    if (!this.get('userService.isLoggedIn')){
      this.transitionTo('/');
    }
  },

  model() {
    return this.store.query('card-set', {userId: this.get('currentUser.id')});
  },

  actions: {
    study(set) {
      this.transitionTo('study', set);
    }
  }
});
