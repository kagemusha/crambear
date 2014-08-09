import DS from 'ember-data';

export default DS.Model.extend({
  cards: DS.hasMany("card",  {async: true}),
  name: DS.attr(),
  public: DS.attr()
});
