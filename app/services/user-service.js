import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: null,
  login(email, password) {
    var session = this.get('session');
    this.set('loggingIn', true);
    return session.open('application', {
      user: {
        email: email,
        password: password,
      }
    });
  }

});
