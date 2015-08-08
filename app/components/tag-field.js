import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['tag-editor'],

  tag: null,
  actions: {
    save() {
      this.sendAction('save', this.get('tag'));
    },
    delete() {
      this.sendAction('delete', this.get('tag'));
    }
  }
});
