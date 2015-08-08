import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  cardSet: DS.belongsTo('card-set', { async: false }),
  tags: DS.hasMany('tag', { async: true }),
  front: DS.attr(),
  back: DS.attr(),
  archived: false ,//todo: make this an attr
  belongsToCurrentUser: Ember.computed.readOnly("cardSet.belongsToCurrentUser"),
});
