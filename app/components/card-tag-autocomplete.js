import Ember from 'ember';
import AutoComplete from "ember-cli-auto-complete/components/auto-complete";

export default AutoComplete.extend({
  classNames: ['card-tag-autocomplete', 'non-materialize'],
  classNameBindings: ['hasInput', 'hasSuggestions'],
  hasInput: Ember.computed.notEmpty('selectedValue'),
  hasSuggestions: true,
  valueProperty: 'name',
  determineSuggestions(options, input) {
    var list = options.filter((item)=> {
      return item.get("name").toLowerCase().indexOf(input.toLowerCase()) > -1;
    });

    return Ember.A(list);
  },
  onInsert: Ember.on('didInsertElement', function(){
    this.$('input').attr('tabindex', -1);
  })

});
