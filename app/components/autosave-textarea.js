import Ember from 'ember';

var uniqueFormIdCounter = 1;
function uniqueFormId() {
  return 'form-control-' + uniqueFormIdCounter++;
}

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card-editor-field'],
  initialVal: null,
  onInit: function(){
    this.set('initialVal', this.get('value'));
  }.on('didInsertElement'),
  focusOut(){
    console.log("focusOut");
    this.autosave();
  },
  keyDown: function(e) {
    switch(e.keyCode) {
      case 13: // 13 = <enter> key
        console.log(`${this.get('initialVal')} - ${this.get('value')}`);
        this.autosave();
        break;
    }
  },
  autosave(){
    if (this.get('value') != this.get('initialVal')){
      this.sendAction('save');
    }
  }
  //controlId: function() {
  //  if(!this.get('_controlId')) {
  //    this.set('_controlId', uniqueFormId());
  //  }
  //  return this.get('_controlId');
  //}.property('_controlId'),
  //valueDidChange: function() {
  //  this.set('isModified', true);
  //}.observes('value'),
  //onSave: function(){
  //  if(this.get('isModified')){
  //    this.set('isModified', false);
  //    this.sendAction('save');
  //  } else {
  //    this.sendAction('focusOut');
  //  }
  //},
  //performAutofocus: function() {
  //  if (this.get('autofocus')) {
  //    this.$('input,textarea').focus().select();
  //  }
  //}.on('didInsertElement'),
  //actions: {
  //  save: function(){
  //    Ember.run.debounce(this, function(){
  //      this.onSave();
  //    }, 10);
  //  },
  //  focusIn: function (){
  //    this.sendAction('focusIn');
  //  }
  //}
});
