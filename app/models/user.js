import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  authToken: attr('string'),
});
