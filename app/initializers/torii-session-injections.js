export default {
  name: 'torii-session-on-adapter',
  after: 'torii-session',
  initialize: function(container, app) {
    app.inject('adapter', 'session', 'torii:session');
    app.inject('service:user-service', 'session', 'torii:session');
  }
};
