import Ember from 'ember';
import ENV from 'crambear/config/environment';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),
  server: ENV.APP.SERVER,
  email: null,
  password: null,
  loggingOut: false,
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),
  showSignupModal: false,
  showLoginModal: false,
  showNewCardSetModal: false,
  newCardSetName: "", //set in modal
  loginError: null,
  signupError: null,

  showModal(prop) {
    this.set(prop, true);
    this.set('openModalProp', prop);
  },

  closeModal() {
    let openModalProp = this.get('openModalProp');
    this.set(openModalProp, false);
    this.set(openModalProp, null);
  },

  actions: {

    login() {
      let email = this.get('email');
      let password = this.get('password');
      this.get('userService').login(email, password).then(()=>{
        this.transitionToRoute('dashboard');
        this.controllerFor('application').set('showLoginModal', false);
        this.set('loggingIn', false);
        this.set('loginError', "");
      }).catch((/*error*/)=>{
        this.set('loginError', "Login failed. Please try again");
      });
    },

    signup() {
      let email = this.get('email');
      let password = this.get('password');
      let passwordConfirmation = this.get('passwordConfirmation');
      this.get('userService').register(email, password, passwordConfirmation).then(()=>{
        this.transitionToRoute('dashboard');
        this.set('registering', false);
        this.controllerFor('application').closeModal();
      }).catch((error)=>{
        this.set('signupError', 'Signup failed. Please try again');
        Ember.Logger.log(`Signup error: ${error}`);
        //todo: better error handling
      });
    },

    logout() {
      if(this.get('loggingOut')) { return; }
      this.set('loggingOut', true);

      this.get('session').close('application').then(()=> {
        //refine this on future so only leave if on authed routes.
        //(could be studying public set
        this.transitionToRoute('/');
      }).catch (()=>{
        Ember.Logger.log('Logout failed');
      }).finally(()=>{
        this.set('loggingOut', false);
      });
    },
  }
});
