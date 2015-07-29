import Ember from 'ember';
import ModalDialog from 'crambear/components/modal-dialog';

export default ModalDialog.extend({
  focus: function(){
    Ember.$('.card-set-name').focus();
  }.on('didInsertElement')
});
