import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service("session"),
  currentUser: null,
  isLoggedIn: Ember.computed.notEmpty('currentUser'),
  login(email, password) {
    let session = this.get('session');
    this.set('loggingIn', true);
    return session.open('application', {
      email: email,
      password: password,
    });
  },
  register(email, password, passwordConfirmation) {
    let session = this.get('session');
    //calls open method in torii-providers/registration
    return session.open('registration', {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    });
  }

});
