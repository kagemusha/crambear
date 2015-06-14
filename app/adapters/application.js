import Ember from 'ember';
import JsonApiAdapter from 'ember-json-api/json-api-adapter';
import config from '../config/environment';

export default JsonApiAdapter.extend({
  host: config.APP.SERVER,
  pathForType(type) {
    var underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  }
});
