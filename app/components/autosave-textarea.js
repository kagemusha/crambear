import Ember from 'ember';
import AutosaveField from 'crambear/mixins/autosave-field';

export default Ember.Component.extend(AutosaveField, {
  editable: false,
  disabled: Ember.computed.not("editable"),
});

