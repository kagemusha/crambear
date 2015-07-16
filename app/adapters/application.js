import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.APP.SERVER,
  headers: function(){
    var headers = {};
    var authToken = this.session.get('currentUser.authToken');
    if (authToken) {
      headers["Authorization"] = "Bearer " + authToken;
    }
    return headers;
  }.property().volatile(),
});
