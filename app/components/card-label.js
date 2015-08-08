import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  label: null,
  card: null,
  onInsert: Ember.on('didInsertElement', function(){
    this.get('card.labels').then(function(labels){
      console.log(`ln: ${labels.get('length')}`);
    });
  }),
  cardHasLabel: Ember.computed('card.labels.[]', 'label', function(key, value){
    return this.get('card.labels').contains(this.get('label'));
  }),
  isChecked: Ember.computed.oneWay('cardHasLabel'),
  onCheckboxValChanged: Ember.observer('isChecked', function(){
    let checked = this.get('isChecked');
    if (checked != this.get('cardHasLabel')){
      let card = this.get('card');
      let label = this.get('label');
      if (checked){
        card.get('labels').addObject(label);
      } else {
        card.get('labels').removeObject(label);
      }
      card.save().catch(()=>{
        alert('failed to save card label');
      })
    }
  }),
});
