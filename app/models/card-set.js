import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly('userService.currentUser'),
  belongsToCurrentUser: function(){
    if (!this.get('currentUser')){
      return false;
    }
    return this.get('currentUser') === this.get('user');
  }.property('currentUser', 'user'),

  user: DS.belongsTo("user"),
  cards: DS.hasMany("card"),
  labels: [], //todo: impl labels model as hasMany
  cardCount: Ember.computed.alias("cards.length"),
  name: attr(),
  public: attr()
});
