import Ember from 'ember';

export default Ember.Mixin.create({
  initialVal: null,
  onInit: Ember.on('didInsertElement', function(){
    this.set('initialVal', this.get('value'));
  }),
  focusOut() {
    this.autosave();
  },
  keyDown: function(e) {
    switch(e.keyCode) {
      case 13:
        this.autosave();
        break;
    }
  },
  autosave() {
    if (this.get('value') !== this.get('initialVal')){
      this.sendAction('save');
    }
  }
});
