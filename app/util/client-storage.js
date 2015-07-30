let inMemoryStorage = {};

export default {
  isActive: function() {
    let t = 'test';

    try {
      window.localStorage.setItem(t, t);
      return true;
    } catch(err){
      return false;
    }
  },

  set: function(key, value) {
    if(!this.isActive()) {
      inMemoryStorage[key] = value;
      return;
    }

    try {
      window.localStorage.setItem(key, value);
    } catch(err) { }
  },

  get: function(key) {
    if(!this.isActive()) {
      return inMemoryStorage[key];
    }

    try {
      return window.localStorage.getItem(key);
    } catch(err) { }
  },

  remove: function(key) {
    if(!this.isActive()) {
      delete inMemoryStorage[key];
      return;
    }

    try {
      window.localStorage.removeItem(key);
    } catch(err) { }
  }
};
