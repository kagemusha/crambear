import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),

  transitionWhenUnauthenticated() {
    if (!this.get('userService.isLoggedIn')){
      this.transitionTo('/');
    }
  },

  beforeModel() {
    this.transitionWhenUnauthenticated();
  },

  model() {
    return this.store.query('cardset', {userId: this.get('currentUser.id')});
  },

});
