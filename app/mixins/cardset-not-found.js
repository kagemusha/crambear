import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    error(error) {
      if (error.errors[0].status === "404") {
        alert(`Couldn't find that card set!`);
      }
      this.transitionTo('dashboard');
    }
  }
});
