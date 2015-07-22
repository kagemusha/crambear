import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),

  onActivate: function(){
    this.transitionAway();
  }.on("activate"),
  transitionAway(){
    if (!this.get('userService.isLoggedIn')){
      this.transitionTo('/');
    }
  },

  model() {
    return this.store.query('card-set', {userId: this.get('currentUser.id')});
  },
});
