import DS from 'ember-data';

export default DS.Model.extend({
  cardSet: DS.belongsTo("cardSet"),
  front: DS.attr(),
  back: DS.attr(),
  archived: false //todo: make this an attr
});
