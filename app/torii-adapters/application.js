import Ember from 'ember';
import ClientStorage from 'crambear/util/client-storage';
import config from 'crambear/config/environment';
const CURRENT_USER_URL = `${config.APP.SERVER}/users/me`;
const LOGOUT_URL = `${config.APP.SERVER}/users/sign_out`;

export default Ember.Object.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias("userService.currentUser"),

  pushUserToStore(userData) {
    var store = this.get('store');
    store.pushPayload('user', userData);
    var userId = userData.data.id;
    var user = store.peekRecord('user', userId);
    this.set('currentUser', user);
    return user;
  },
  open(response) {
    var user = this.pushUserToStore(response);
    ClientStorage.set('authToken', user.get('authToken'));
    return Ember.RSVP.Promise.resolve({currentUser: user});
  },
  fetch() {
    var self = this;
    return new Ember.RSVP.Promise((resolve, reject)=> {
      var authToken = ClientStorage.get('authToken');
      if (!authToken) {
        reject("No authToken present");
        return;
      }

      var success = (response)=>{
        Ember.run(()=>{
          var user = self.pushUserToStore(response);
          ClientStorage.set('authToken', user.get('authToken'));
          resolve({currentUser: user});
        });
      };

      var error = (jqxhr, status, error)=>{
        Ember.run(()=>{
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
  close() {
    return new Ember.RSVP.Promise((resolve, reject)=>{
      var authToken = ClientStorage.get('authToken');

      var success = ()=> {
        var store = this.get('store');
        store.unloadAll('card-set');
        store.unloadAll('card');
        store.unloadRecord(this.get('currentUser'));
        this.set('currentUser', null);
        Ember.run(()=>{
          ClientStorage.remove('authToken');
          resolve();
        });
      };

      var error = (jqxhr, status, error)=>{
        Ember.run(()=>{
          reject(error);
        });
      };

      Ember.$.ajax({
        type: "DELETE",
        url: LOGOUT_URL,
        beforeSend: (xhr)=>{
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        },
        success: success,
        error: error,
        dataType: 'text'
      });
    });
  }

});
