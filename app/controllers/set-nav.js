import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ["application"],
  publicSets: Ember.computed.alias("controllers.application.publicSets"),
  mySets: null       //if loggedIn getCurrentUser's sets else null
});
