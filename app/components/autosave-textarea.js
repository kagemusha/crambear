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
});
