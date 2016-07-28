import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['card-tag'],
  classNameBindings: ['selected', 'hasInput', 'hasSuggestions'],

  setTags: Ember.computed.readOnly("card.cardset.tags"),
  unusedSetTags: Ember.computed('setTags', 'card.tags', function(){
    return this.get('setTags').filter((tag)=>{
      return !this.get('card.tags').contains(tag);
    });
  }),
  hasNoTags: Ember.computed.equal('card.tags.length', 0),
  newCardTag: '',

  keyDown(e) {
    switch(e.keyCode) {
      case 8:
        if (Ember.isBlank(this.get('newCardTag'))){
          this.removeTag();
          e.preventDefault();
        }
        break;
      case 9:
      case 13:
        this.createTag();
        break;
      case 27:
        this.set('newCardTag', '');
        this.set('isAddingTag', false);
        break;

    }
  },

  createTag() {
    let newTagName = this.get('newCardTag');
    if (Ember.isBlank(newTagName)){
      return;
    }
    let tag = this.get('setTags').findBy('name', newTagName);
    if (!tag){
      tag =  this.get('card.store').createRecord('tag', {
        name: newTagName,
        cardset: this.get('card.cardset')
      });
    }
    this.saveTag(tag);
  },

  saveTag(tag) {
    let card = this.get('card');
    if (tag.get('cards').contains(card)){
      this.finishedEditing();
      return;
    }
    tag.get('cards').addObject(card);
    tag.save().then(()=>{
      //this gets destroyed if this is card's first tag
      if (!this.isDestroyed) {
        this.set('newCardTag', '');
      }
    }).catch(()=>{
      alert('failed to add tag to card');
    });
  },

  finishedEditing() {
    this.set('newCardTag', '');
    this.set('isAddingTag', false);
  },


  removeTag() {
    let card = this.get('card');
    card.get('tags').removeObject(this.get('tag'));
    card.save().catch(()=>{
      alert('failed to remove tag from card');
    });
  },

  actions: {
    tagSelected(tag) {
      this.saveTag(tag);
    }
  }

});
