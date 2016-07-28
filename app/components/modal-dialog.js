import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({

  //focus: Ember.on('didInsertElement', function(){
  //  debugger
  //  let focusSelector = this.get('focusSelector');
  //  if (this.get('focusSelector')){
  //    Ember.$(focusSelector).focus();
  //  }
  //}),
  setup: Ember.on('didInsertElement', function() {
    Ember.$('body').on('keydown.modal-dialog', (e) => {
      if (e.keyCode === 27) {
        this.sendAction('close');
      }
      if (e.keyCode === 13) {
        this.sendAction('doSomething');
      }
    });
  }),

  teardown: Ember.on('willDestroyElement', function() {
    Ember.$('body').off('keyup.modal-dialog');
  }),
});
