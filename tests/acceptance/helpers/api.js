import { server, mockResponse } from './server';

export default {
  //currently payloads are taken from actual payloads; at some point use factories, but need to
  //be able to convert to ember-json-api

  /*
    *  If user has logged in, their card sets will have already
    *  been sent over so return 304.  If reload of authed user
    *  then will be a 200.
   */
  getCardsets(userSetsReturnCode=200){
    server(function () {
      this.get('api/cardsets', function (request) {
        let params = request.queryParams;
        if (params.public === 'true') {
          let payload =  {"data":[{"id":"15","type":"cardsets","links":{"self":"/cardsets/15"},"attributes":{"name":"Ember","card-count":12},"relationships":{"user":{"links":{"self":"/cardsets/15/relationships/user","related":"/cardsets/15/user"}},"cards":{"links":{"self":"/cardsets/15/relationships/cards","related":"/cardsets/15/cards"}},"tags":{"links":{"self":"/cardsets/15/relationships/tags","related":"/cardsets/15/tags"}}}},{"id":"16","type":"cardsets","links":{"self":"/cardsets/16"},"attributes":{"name":"Ruby","card-count":11},"relationships":{"user":{"links":{"self":"/cardsets/16/relationships/user","related":"/cardsets/16/user"}},"cards":{"links":{"self":"/cardsets/16/relationships/cards","related":"/cardsets/16/cards"}},"tags":{"links":{"self":"/cardsets/16/relationships/tags","related":"/cardsets/16/tags"}}}}]};
          return mockResponse(payload);
        }
        if (params.userId === '1'){

          let payload = {"data":[{"id":"17","type":"cardsets","links":{"self":"/cardsets/17"},"attributes":{"name":"a","card-count":4},"relationships":{"user":{"links":{"self":"/cardsets/17/relationships/user","related":"/cardsets/17/user"}},"cards":{"links":{"self":"/cardsets/17/relationships/cards","related":"/cardsets/17/cards"}},"tags":{"links":{"self":"/cardsets/17/relationships/tags","related":"/cardsets/17/tags"}}}},{"id":"19","type":"cardsets","links":{"self":"/cardsets/19"},"attributes":{"name":"b","card-count":0},"relationships":{"user":{"links":{"self":"/cardsets/19/relationships/user","related":"/cardsets/19/user"}},"cards":{"links":{"self":"/cardsets/19/relationships/cards","related":"/cardsets/19/cards"}},"tags":{"links":{"self":"/cardsets/19/relationships/tags","related":"/cardsets/19/tags"}}}}]};
          return mockResponse(payload, userSetsReturnCode);
        }

      });
    });
  },

  getSignIn() {
    let payload = {"data":{"id":"1","type":"users","links":{"self":"/users/1"},"attributes":{"email":"t@t.com","name":"Tester","auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDIwMTAyNjcsInN1YiI6MSwiZXhwIjoxNDQyNjE1MDY3fQ.z1tJil57eYn8YCiPgfqyNk8NhYNPCidcHkuK6Pw-j0U"},"relationships":{"cardsets":{"links":{"self":"/users/1/relationships/cardsets","related":"/users/1/cardsets"},"data":[{"type":"cardsets","id":"17"},{"type":"cardsets","id":"19"}]}}},"included":[{"id":"17","type":"cardsets","links":{"self":"/cardsets/17"},"attributes":{"name":"a","card-count":4},"relationships":{"user":{"links":{"self":"/cardsets/17/relationships/user","related":"/cardsets/17/user"}},"cards":{"links":{"self":"/cardsets/17/relationships/cards","related":"/cardsets/17/cards"}},"tags":{"links":{"self":"/cardsets/17/relationships/tags","related":"/cardsets/17/tags"}}}},{"id":"19","type":"cardsets","links":{"self":"/cardsets/19"},"attributes":{"name":"b","card-count":0},"relationships":{"user":{"links":{"self":"/cardsets/19/relationships/user","related":"/cardsets/19/user"}},"cards":{"links":{"self":"/cardsets/19/relationships/cards","related":"/cardsets/19/cards"}},"tags":{"links":{"self":"/cardsets/19/relationships/tags","related":"/cardsets/19/tags"}}}}]};
    server(function () {
      this.post('/users/sign_in', ()=> {
        return mockResponse(payload);
      });
    });
  },

  getMe() {
    let payload = {"data":{"id":"1","type":"users","links":{"self":"/users/1"},"attributes":{"email":"t@t.com","name":"Tester","auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDIwNzI4MzIsInN1YiI6MSwiZXhwIjoxNDQyNjc3NjMyfQ.oZXfckerScqZAi5OjNMW9EVMfglSTdG01k6izq6ttjI"},"relationships":{"cardsets":{"links":{"self":"/users/1/relationships/cardsets","related":"/users/1/cardsets"},"data":[{"type":"cardsets","id":"17"},{"type":"cardsets","id":"19"}]}}},"included":[{"id":"17","type":"cardsets","links":{"self":"/cardsets/17"},"attributes":{"name":"a","card-count":4},"relationships":{"user":{"links":{"self":"/cardsets/17/relationships/user","related":"/cardsets/17/user"}},"cards":{"links":{"self":"/cardsets/17/relationships/cards","related":"/cardsets/17/cards"}},"tags":{"links":{"self":"/cardsets/17/relationships/tags","related":"/cardsets/17/tags"}}}},{"id":"19","type":"cardsets","links":{"self":"/cardsets/19"},"attributes":{"name":"b","card-count":0},"relationships":{"user":{"links":{"self":"/cardsets/19/relationships/user","related":"/cardsets/19/user"}},"cards":{"links":{"self":"/cardsets/19/relationships/cards","related":"/cardsets/19/cards"}},"tags":{"links":{"self":"/cardsets/19/relationships/tags","related":"/cardsets/19/tags"}}}}]};
    server(function () {
      this.get('/users/me', ()=> {
        return mockResponse(payload);
      });
    });
  }
};
