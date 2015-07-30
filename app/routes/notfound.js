import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition){
    let route = transition.params.notfound.wildcard;
    alert(`Didn't find route: ${route}. Did you enter it in correctly?`);
    this.transitionTo('/');
  }
});
