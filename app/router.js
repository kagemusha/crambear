import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("card-set", {path: "/card_set/:card_set_id"});
  this.route('study', { path: '/study/:card_set_id' });
});

export default Router;
