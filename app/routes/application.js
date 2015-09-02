import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly("userService.currentUser"),
  isLoggedIn: Ember.computed.readOnly("userService.isLoggedIn"),
  showLoginModal: false,


  beforeModel() {
    if (!this.get('isLoggedIn')){
      return this.get('session').fetch('application').catch((error)=>{
        Ember.Logger.log(`Error getting session: ${error}`);
      });
    }
  },

  actions: {
    showModal(prop) {
      this.controllerFor('application').showModal(prop);
    },
    closeModal() {
      this.controllerFor('application').closeModal();
    },
    createCardSet() {
      let name = this.controllerFor('application') .get('newCardSetName');
      if (!Ember.isEmpty(name)){
        //while this is not necessary for the server, which is going to use its current user,
        //it is necessary for unrefreshed
        let newSet = this.store.createRecord('card-set', {name: name, user: this.get('currentUser')});
        newSet.save().then((cardSet)=>{
          this.controllerFor('application') .set('newCardSetName', '');
          this.transitionTo('card-set', cardSet);
        }).catch(()=>{
          alert("new set failed");
        }).finally(()=>{
          this.controllerFor('application').closeModal('showNewCardSetModal');
        });
      }
    },
    deleteCardSet(set) {
      set.deleteRecord();
      set.save().catch(()=>{
        alert('error deleting set');
      });
    },
    willTransition(transition) {
      if (this.get('session.isAuthenticated')){
        if (transition.targetName === 'index'){
          transition.abort();
          this.transitionTo('dashboard');
        }
      }
    }
  }
});
