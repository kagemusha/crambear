import Ember from 'ember';
import JsonApiSerializer from 'ember-json-api/json-api-serializer';
export default JsonApiSerializer.extend({
  modelNameFromPayloadKey: function(root) {
    var dasherize = Ember.String.dasherize(root);
    return Ember.String.singularize(dasherize);
  },
  serializeIntoHash: function(data, type, record, options) {
    var root = Ember.String.decamelize(type.typeKey);
    data[root] = this.serialize(record, options);
  },
  serializeAttribute: function(record, json, key, attribute) {
    var attrs = Ember.get(this, 'attrs');
    var value = Ember.get(record, key), type = attribute.type;

    if (type) {
      var transform = this.transformFor(type);
      value = transform.serialize(value);
    }

    // if provided, use the mapping provided by `attrs` in
    // the serializer
    key = attrs && attrs[key] || Ember.String.decamelize(key);

    json[key] = value;
  }
});
