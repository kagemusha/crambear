import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),
  model() {
    return this.store.query('card-set', {userId: this.get('currentUser.id')});
  },
  onActivate: function(){
    this.transitionAway();
  }.on("activate"),
  onSessionStatusChange: function(){
    this.transitionAway();
  }.observes('userService.isLoggedIn'),

  transitionAway(){
    if (!this.get('userService.isLoggedIn')){
      this.transitionTo('/');
    }
  }

});
