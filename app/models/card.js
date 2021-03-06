import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  cardset: DS.belongsTo('cardset', { async: false }),
  tags: DS.hasMany('tag', { async: false }),
  front: DS.attr(),
  back: DS.attr(),
  archived: false ,//todo: make this an attr
  belongsToCurrentUser: Ember.computed.readOnly("cardset.belongsToCurrentUser"),
});
