import DS from 'ember-data';
import Em from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
  cards: DS.hasMany("card"),
  cardCount: Em.computed.alias("cards.length"),
  name: attr(),
  public: attr()
});
