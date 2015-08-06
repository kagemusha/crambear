import DS from 'ember-data';

export default DS.Model.extend({
  cardSet: DS.belongsTo('card-set'),
  name: DS.attr(),
});
