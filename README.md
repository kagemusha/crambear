[![Build Status](https://travis-ci.org/kagemusha/crambear.png)](https://travis-ci.org/kagemusha/crambear)

*** WIP ***

# A non-trivial Ember tutorial app


Crambear is a flash cards app written in EmberJs.  It is intended as a non-trivial intro to Ember development (of the [Ember CLI](https://github.com/stefanpenner/ember-cli) variety).  By non-trivial I mean an app that has more than the one or two models you find in the standard todo intro apps, that illustrates general features like authentication, and has a real backend -- ie it illustrates a complete system, not a toy.  At the same time, it is intended to be simple enough for a relative beginner to understand with the proper dilligence.

This project is developed on top of [Ember CLI](https://github.com/stefanpenner/ember-cli).  It uses standard Javascript, Handlebars and SCSS (even though my personal preferences are Coffee, Emblem and SASS).  It also uses Ember data as much as possible, though there may be some departures when necessary and to illustrate ways to access a server.

There is a companion [Rails server project](https://github.com/kagemusha/crambear-api), but there is no dependence on Rails as all server communication is through JSON.  


## Getting Started

Everything from what you need to install to starting the app is described in the [Ember CLI Getting Started guide](http://www.ember-cli.com/#getting-started).

    
## The App

Crambear is a flash-cards app.  It will allow you to create cards sets and cards, and tag your cards.  You can study sets or subsets based on tags.  At some point maybe we may add performance stats.

### Data Model

The basic data model is:

    User
        has many card_sets

    cardset
        belongs to user
        has many cards
        has many tags

    Card
        belongs to card_set
        has and belongs to many tags

    Tag
        belongs to card_set
        has and belongs to many cards

### Tests

There are currently very basic unit tests.  Acceptance tests are coming, but pending better ways to mock the new json-api spec.  Will be looking at [ember-cli-mirage](https://github.com/samselikoff/ember-cli-mirage), where json-api mock responses are on roadmap but not ready yet.
### Other Features

Authentication: basic token-based at first, with OAuth 2 possible at some point


## Helping Out

...is welcomed!


###License
Copyright 2014 Michael Madrid under the [MIT License](http://opensource.org/licenses/MIT)
