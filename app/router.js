import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("dashboard");
  this.route('public');
  this.route("cardset", {path: "/cardset/:card_set_id"});
  this.route('study', { path: '/study/:card_set_id' });
  this.route('notfound', { path: '/*wildcard' });
});

export default Router;
