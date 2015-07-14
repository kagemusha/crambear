import DS from 'ember-data';
import Em from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
  cards: DS.hasMany("card", {async: false}),
  labels: [], //todo: impl labels model as hasMany
  cardCount: Em.computed.alias("cards.length"),
  name: attr(),
  public: attr()
});
