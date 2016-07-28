import DS from 'ember-data';

export default DS.Model.extend({
  cardset: DS.belongsTo('cardset', { async: false }),
  cards: DS.hasMany('card', { async: true }),
  name: DS.attr(),
});
