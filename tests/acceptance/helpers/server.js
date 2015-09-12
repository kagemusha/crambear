/* global Pretender, QUnit */

var pretender;

QUnit.testDone(function () {
  if (pretender) {
    pretender.shutdown();
    pretender = null;
  }
  window.localStorage.removeItem('authToken');
});

export function server(dsl) {
  if (pretender) {
    dsl.call(pretender);
  } else {
    pretender = new Pretender(dsl);
  }
  return pretender;
}

export function mockResponse(payload, responseCode){
  var code = responseCode || 200;
  return [ code, {
    "Content-Type": "application/json"
  }, JSON.stringify(payload) ];
}
