import DS from 'ember-data';
import Ember from 'ember';

const attr = DS.attr;

export default DS.Model.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.readOnly('userService.currentUser'),
  belongsToCurrentUser: Ember.computed('currentUser', 'user', function(){
    if (!this.get('currentUser')){
      return false;
    }
    return this.get('currentUser') === this.get('user');
  }),

  user: DS.belongsTo('user', { async: false }),
  cards: DS.hasMany('card', {async: true}),
  tags: DS.hasMany('tag', {async: true}),
  cardCount: attr(),
  name: attr(),
  public: attr(),

  isEmpty: Ember.computed.empty('cards'),
});
