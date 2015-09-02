import Ember from 'ember';

export default Ember.Route.extend({
  //currently this looks alot like index, but will vary in future
  model() {
    return this.store.query("cardSet", {public: true});
  },
});
