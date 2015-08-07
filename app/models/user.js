import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  cardSets: DS.hasMany('card-set', {async: false}),
  name: attr('string'),
  email: attr('string'),
  authToken: attr('string'),
});
