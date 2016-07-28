import Ember from 'ember';

export default Ember.Controller.extend({
  hasNoSets: Ember.computed.empty('model'),
  modalOffsetTarget: Ember.computed('hasNoSets', function(){
    return this.get('hasNoSets') ? '#create-first-set-button' : '#new-set-button';
  }),

  actions: {
    editCardset(set) {
      this.transitionTo('cardset', set);
    },
  }
});
