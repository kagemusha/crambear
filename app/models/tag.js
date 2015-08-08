import DS from 'ember-data';

export default DS.Model.extend({
  cardSet: DS.belongsTo('card-set', { async: false }),
  cards: DS.hasMany('card', { async: true }),
  name: DS.attr(),
});
