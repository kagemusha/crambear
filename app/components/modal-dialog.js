import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  setup: function() {
    Ember.$('body').on('keydown.modal-dialog', (e) => {
      if (e.keyCode === 27) {
        this.sendAction('close');
      }
      if (e.keyCode === 13) {
        this.sendAction('doSomething');
      }
    });
  }.on('didInsertElement'),

  teardown: function() {
    Ember.$('body').off('keyup.modal-dialog');
  }.on('willDestroyElement'),
});
