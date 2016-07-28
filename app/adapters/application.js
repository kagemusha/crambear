import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.APP.SERVER,
  namespace: "api",
  pathForType: function(type) {
    const pluralized = Ember.String.pluralize(type);
    return Ember.String.underscore(pluralized);
  },

  headers: Ember.computed(function(){
    let headers = {};
    let authToken = this.session.get('currentUser.authToken');
    if (authToken) {
      headers["Authorization"] = "Bearer " + authToken;
    }
    return headers;
  }).volatile(),
});
