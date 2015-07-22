import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  isLoggedIn: Ember.computed.readOnly("userService.isLoggedIn"),

  onActivate: function(){
    this.transitionAway();
  }.on("activate"),

  transitionAway(){
    if (this.get('isLoggedIn')){
      this.transitionTo('dashboard');
    }
  },
  model() {
    return this.store.query("cardSet", {public: true});
  },
});
