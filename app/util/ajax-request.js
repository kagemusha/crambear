import Ember from 'ember';
import ClientStorage from './client-storage';

export function emberAjaxRequest(type, url, data, options) {
  return new Ember.RSVP.Promise(function(resolve, reject){
    var success = function(response) {
      Ember.run(function(){
        resolve(response);
      });
    };

    var error = function(jqxhr, status, error){
      Ember.run(function(){
        reject(error);
      });
    };
    var requestData = {
      type: type,
      url: url,
      data: data,
      success: success,
      error: error,
      dataType: 'json'
    };

    if (options && options.authBefore === true) {
      var authToken = ClientStorage.get('authToken');
      requestData.beforeSend = function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      };
    }

    Ember.$.ajax(requestData);
  });
}
