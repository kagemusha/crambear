import Ember from 'ember';
import ClientStorage from './client-storage';

export function emberAjaxRequest(type, url, data, options) {
  return new Ember.RSVP.Promise(function(resolve, reject){
    let success = function(response) {
      Ember.run(function(){
        resolve(response);
      });
    };

    let error = function(jqxhr, status, error){
      Ember.run(function(){
        reject(error);
      });
    };
    let requestData = {
      type: type,
      url: url,
      data: data,
      success: success,
      error: error,
      //contentType: "application/json; charset=utf-8",
      dataType: 'json'
    };

    if (options && options.authBefore === true) {
      let authToken = ClientStorage.get('authToken');
      requestData.beforeSend = function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      };
    }

    Ember.$.ajax(requestData);
  });
}
