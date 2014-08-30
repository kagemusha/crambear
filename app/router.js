import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CrambearENV.locationType
});

Router.map(function() {
  this.resource("card-set", {path: "/card_set/:card_set_id"});
  this.route('study', { path: '/study/:card_set_id' });
});

export default Router;
