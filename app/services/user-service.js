import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: null,
  isLoggedIn: Ember.computed.notEmpty('currentUser'),
  login(email, password) {
    var session = this.get('session');
    this.set('loggingIn', true);
    return session.open('application', {
      user: {
        email: email,
        password: password,
      }
    });
  },
  register(email, password, passwordConfirmation) {
    var session = this.get('session');
    return session.open('registration', {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    });
  }

});
