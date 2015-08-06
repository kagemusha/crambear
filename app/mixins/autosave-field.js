import Ember from 'ember';

export default Ember.Mixin.create({
  classNames: ['card-editor-field'],
  initialVal: null,
  onInit: function(){
    this.set('initialVal', this.get('value'));
  }.on('didInsertElement'),
  focusOut(){
    this.autosave();
  },
  keyDown: function(e) {
    switch(e.keyCode) {
      case 13:
        this.autosave();
        break;
    }
  },
  autosave(){
    if (this.get('value') !== this.get('initialVal')){
      this.sendAction('save');
    }
  }
});
