import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),

  email: null,
  password: null,
  password_confirmation: null,
});
