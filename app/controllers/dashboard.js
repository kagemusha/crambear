import Ember from 'ember';

export default Ember.Controller.extend({
  hasNoSets: Ember.computed.empty('model'),
  modalOffsetTarget: Ember.computed('hasNoSets', function(){
    return this.get('hasNoSets') ? '#create-first-set-button' : '#new-set-button';
  }),

  actions: {
    editCardSet(set) {
      this.transitionTo('card-set', set);
    },
  }
});
