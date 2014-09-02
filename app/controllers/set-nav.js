import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ["application"],
  publicSets: function(){
    var cardSets = this.store.all('cardSet').filterBy('public', true);
    if (cardSets.get('length') < 2) {
      //will always have at least one set on cardSet page, but not whole set
      //revisit this at some point
      return this.store.find('cardSet', {public: true});
    } else {
      return cardSets;
    }
  }.property(),
  mySets: null       //if loggedIn getCurrentUser's sets else null
});
