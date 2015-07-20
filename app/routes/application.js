import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    if (!this.get('session.isAuthenticated')){
      return this.get('session').fetch('application').catch(()=>{
        console.log('error');
      });
    }
  },
  actions: {
    showNewCardSetModal(){
      this.controllerFor('application').toggleProperty('isShowingModal');
    },
    willTransition(transition) {
      if (this.get('session.isAuthenticated')){
        if (transition.targetName === 'index'){
          transition.abort();
          this.transitionTo('dashboard');
        }
      }
      console.log("transis to appl");
    }
  }
});
