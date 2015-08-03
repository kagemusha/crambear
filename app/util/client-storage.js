export default {

  set: function(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch(err) { }
  },

  get: function(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch(err) { }
  },

  remove: function(key) {
    try {
      window.localStorage.removeItem(key);
    } catch(err) { }
  }
};
