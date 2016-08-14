import Ember from 'ember';
import { emberAjaxRequest } from 'crambear/util/ajax-request';
import config from 'crambear/config/environment';

const LOGIN_URL = `${config.APP.SERVER}/api/sessions`;

export default Ember.Object.extend({

  open: function(credentials) {
    return emberAjaxRequest("POST", LOGIN_URL, credentials);
  }
});
