/* jshint node: true */

//assume rails default
var DEFAULT_DEV_SERVER = 'http://localhost:4000';

/*
* Use ember-cli-dotenv
* if you wish to override dev server, make a .env file
* with an entry `server=yourServerUrl`
* ref: https://github.com/fivetanley/ember-cli-dotenv
 */
function getDevServer(){
  return (process && process.env && process.env.server) || DEFAULT_DEV_SERVER;
}

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'crambear',
    environment: environment,
    baseURL: '/',
    rootURL: '/',
    locationType: 'auto',
    torii: {
      sessionServiceName: 'session',
    },
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {

    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.SERVER = getDevServer()
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.SERVER = '';
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // this should be env variable but must figure out way to do
    // this which allows easy customization of various possible hosting
    // services
    ENV.APP.SERVER = 'https://crambear-api.herokuapp.com';
  }

  return ENV;
};
