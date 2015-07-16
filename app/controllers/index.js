import Em from 'ember';

export default Em.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),
  isLoggedIn: Em.computed.and('session.isAuthenticated'),
});
