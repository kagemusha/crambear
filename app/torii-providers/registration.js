import Ember from 'ember';
import { emberAjaxRequest } from 'crambear/util/ajax-request';
import config from 'crambear/config/environment';

const REGISTRATION_URL = `${config.APP.SERVER}/users/`;

export default Ember.Object.extend({
  open: function(credentials) {
    return emberAjaxRequest("POST", REGISTRATION_URL, credentials);
  }
});
