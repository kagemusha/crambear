import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),

  email: null,
  password: null,
  password_confirmation: null,

  actions: {
    register(){
      var email = this.get('email');
      var password = this.get('password');
      var passwordConfirmation = this.get('passwordConfirmation');
      this.get('userService').register(email, password, passwordConfirmation).then(()=>{
        this.transitionToRoute('dashboard');
      }).catch((error)=>{
        alert('Registration failed');
        console.log(`Registration error: ${error}`);
        //todo: better error handling
      }).finally(()=>{
        this.set('registering', false);
      });
    },
  }
});