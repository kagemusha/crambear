import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias('userService.currentUser'),

  email: null,
  password: null,
  loggingOut: false,
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),
  isShowingModal: false,
  newCardSetName: "", //set in modal
  onSessionStatusChange: function(){
    this.transitionAway();
  }.observes('isLoggedIn').on('init'),
  transitionAway(){
    if (this.get('isLoggedIn')) {
      this.transitionToRoute('dashboard');
    }
  },
  actions: {
    login(){
      var email = this.get('email')
      var password = this.get('password')
      this.get('userService').login(email, password).catch((error)=>{
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

    logout(){
      if(this.get('loggingOut')) { return; }
      this.set('loggingOut', true);

      this.get('session').close('application').catch(()=>{
        console.log('Logout failed');
      }).finally(()=>{
        this.set('loggingOut', false);
      });
    },

    createCardSet(){
      if (!Ember.isEmpty(this.get('newCardSetName'))){
        var newSet = this.store.createRecord('card-set', {name: this.get('newCardSetName')});
        newSet.save().then((cardSet)=>{
          this.transitionToRoute('card-set', cardSet);
        }).catch((reason)=>{
          alert("new set failed");
        }).finally(()=>{
          this.set("isShowingModal", false);
        })
      }
    }
  }
});
