import Em from 'ember';

export default Em.Controller.extend({
  currentUser: null, //todo
  isLoggedIn: Em.computed.and('session.isAuthenticated', 'currentUser'),
});
