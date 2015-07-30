import DS from 'ember-data';
import Ember from 'ember';

const attr = DS.attr;

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
  cards: DS.hasMany("card", {async: true}),
  labels: [], //todo: impl labels model as hasMany
  cardCount: Ember.computed('cards.@each', function(){
    let cards = this.get('cards');
    if (Ember.isEmpty(cards)){
      return 0;
    }
    let savedCards = cards.reject((card)=>{
      return card.get('isNew');
    });
    return savedCards.get('length');
  }),
  name: attr(),
  public: attr(),

  isEmpty: Ember.computed.empty('cards'),
});
