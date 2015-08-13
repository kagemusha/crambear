import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-tags'],
  clicked: false,
  click(e){
    this.set('clicked', true);
    if (e.target.tagName !== 'INPUT'){
      let focusElement = Ember.$(e.target).next().find('input');
      if (Ember.isBlank(focusElement)) {
        focusElement =  this.$('input:last').focus();
      }
      focusElement.focus();
    }
  }
});
