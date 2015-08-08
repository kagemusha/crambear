import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  tag: null,
  card: null,
  onInsert: Ember.on('didInsertElement', function(){
    this.get('card.tags').then(function(tags){
      console.log(`ln: ${tags.get('length')}`);
    });
  }),
  cardHasTag: Ember.computed('card.tags.[]', 'tag', function(){
    return this.get('card.tags').contains(this.get('tag'));
  }),
  isChecked: Ember.computed.oneWay('cardHasTag'),
  onCheckboxValChanged: Ember.observer('isChecked', function(){
    let checked = this.get('isChecked');
    if (checked !== this.get('cardHasTag')){
      let card = this.get('card');
      let tag = this.get('tag');
      if (checked){
        card.get('tags').addObject(tag);
      } else {
        card.get('tags').removeObject(tag);
      }
      card.save().catch(()=>{
        alert('failed to save card tag');
      });
    }
  }),
});
