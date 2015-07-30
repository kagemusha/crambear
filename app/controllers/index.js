import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),

  email: null,
  password: null,
  password_confirmation: null,

  actions: {
    register(){
      let email = this.get('email');
      let password = this.get('password');
      let passwordConfirmation = this.get('passwordConfirmation');
      this.get('userService').register(email, password, passwordConfirmation).then(()=>{
        this.transitionToRoute('dashboard');
      }).catch((error)=>{
        alert('Registration failed');
        Ember.Logger.log(`Registration error: ${error}`);
        //todo: better error handling
      }).finally(()=>{
        this.set('registering', false);
      });
    },
  }
});
