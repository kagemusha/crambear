import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),

  email: null,
  password: null,
  loggingOut: false,
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),
  showCardSetCreateModal: false,
  newCardSetName: "", //set in modal
  onSessionStatusChange: Ember.on('init', Ember.observer('isLoggedIn', function(){
    this.transitionAway();
  })),
  transitionAway() {
    if (!this.get('userService.isLoggedIn')){
      this.transitionToRoute('index');
    }
  },
  actions: {
    login() {
      let email = this.get('email');
      let password = this.get('password');
      this.get('userService').login(email, password).then(()=>{
        this.transitionToRoute('dashboard');
      }).catch((error)=>{
        let errorMessage = error;
        // http 401 = "Unauthorized" from jQuery XHR
        if(error === 'Unauthorized') {
          errorMessage = 'Unable to login. Email and/or password incorrect.';
        }
      }).finally(()=>{
        this.set('loggingIn', false);
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
