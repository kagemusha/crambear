import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cardset-item'],
  tagName: 'li',
  actions: {
    edit() {
      this.attrs.edit(this.get('cardSet'));
    },
    delete() {
      this.sendAction('delete', this.get('cardSet'));
    },
  }
});
