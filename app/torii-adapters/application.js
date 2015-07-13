import Ember from 'ember';
import ClientStorage from 'crambear/util/client-storage';
import config from 'crambear/config/environment';
const CURRENT_USER_URL = `${config.APP.SERVER}/users/me`
const LOGOUT_URL = `${config.APP.SERVER}/users/sign_out`

export default Ember.Object.extend({
  userService: Ember.inject.service(),

  pushUserToStore: function(userData){
    var store = this.get('store');
    var users = store.pushPayload('user', userData);
    var user = store.peekAll('user').objectAt(0);
    this.set('userService.currentUser', user);
    return user;
  },
  open: function(response){
    var user = this.pushUserToStore(response);
    ClientStorage.set('authToken', user.get('authToken'));
    return Ember.RSVP.Promise.resolve({currentUser: user});
  },
  fetch: function(){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      var authToken = ClientStorage.get('authToken');
      if (!authToken) {
        reject("No authToken present");
        return;
      }

      var success = function(response) {
        Ember.run(function(){
          var user = self.pushUserToStore(response);
          ClientStorage.set('authToken', user.get('authToken'));
          resolve({currentUser: user});
        });
      };

      var error = function(jqxhr, status, error){
        Ember.run(function(){
          reject(error);
        });
      };

      Ember.$.ajax({
        type: 'GET',
        url: CURRENT_USER_URL,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        },
        success: success,
        error: error,
        dataType: 'json'
      });
    });
  },
  close: function(){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var authToken = ClientStorage.get('authToken');

      var success = function() {
        Ember.run(function(){
          ClientStorage.remove('authToken');
          resolve();
        });
      };

      var error = function(jqxhr, status, error){
        Ember.run(function(){
          reject(error);
        });
      };

      Ember.$.ajax({
        type: "DELETE",
        url: LOGOUT_URL,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        },
        success: success,
        error: error,
        dataType: 'text'
      });
    });
  }

});
