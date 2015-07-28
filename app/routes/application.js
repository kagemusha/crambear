import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  isLoggedIn: Ember.computed.readOnly("userService.isLoggedIn"),


  beforeModel() {
    if (!this.get('isLoggedIn')){
      return this.get('session').fetch('application').catch(()=>{
        console.log('error');
      });
    }
  },
  actions: {
    showNewCardSetModal(){
      this.controllerFor('application').toggleProperty('showCardSetCreateModal');
    },
    toggleModal(){
      this.controllerFor('application').toggleProperty('showCardSetCreateModal');
    },
    createCardSet(){
      var name = this.controllerFor('application') .get('newCardSetName');
      if (!Ember.isEmpty(name)){
        var newSet = this.store.createRecord('card-set', {name: name});
        newSet.save().then((cardSet)=>{
          this.transitionTo('card-set', cardSet);
        }).catch(()=>{
          alert("new set failed");
        }).finally(()=>{
          this.controllerFor('application') .set('newCardSetName', '');
          this.controllerFor('application').toggleProperty('showCardSetCreateModal');
        });
      }
    },
    deleteCardSet(set){
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
