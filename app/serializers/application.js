import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  isNewSerializerAPI: true,

  keyForAttribute: function(attr) {
    return attr && attr.underscore();
  },

  keyForRelationship: function(rawKey) {
    return rawKey && rawKey.underscore();
  }
});
