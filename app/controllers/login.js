import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),

  returnTo: '/',

  email: 'm@m.com',
  password: 'wagner',
  loggingIn: false,

  resetForm() {
    this.setProperties({
      email: null,
      password: null
    });
  },

  actions: {
    login(email, password) {
      this.get('userService').login(email, password).then(()=>{
        this.send('successfulSignIn');
      }).catch((error)=>{
        var errorMessage = error;
        // http 401 = "Unauthorized" from jQuery XHR
        if(error === 'Unauthorized') {
          errorMessage = 'Unable to login. Email and/or password incorrect.';
        }
        this.send('showWarning', errorMessage);
      }).finally(()=>{
        this.set('loggingIn', false);
      });
    },

    successfulSignIn() {
      this.resetForm();
      this.transitionToRoute(this.get('returnTo'));
    }
  }
});
