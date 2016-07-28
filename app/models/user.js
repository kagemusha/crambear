import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  cardsets: DS.hasMany('cardset', {async: false}),
  name: attr('string'),
  email: attr('string'),
  authToken: attr('string'),
});
