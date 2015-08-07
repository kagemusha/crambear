import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['label-editor'],

  label: null,
  actions: {
    save() {
      this.sendAction('save', this.get('label'));
    },
    delete() {
      this.sendAction('delete', this.get('label'));
    }
  }
});
