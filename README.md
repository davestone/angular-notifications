# angular-notifications (WIP)

Simple yet highly customizable Notifications within your Angular.js app.

## How to use it

If your Angular.js application, setup channels of notifications, and (optionally) a base 'message' object that will be used.

```javascript
angular.module('myApp')
  .config(['NotificationsProvider', function(NotificationsProvider){

    NotificationsProvider.setChannels(['flash']);
    NotificationsProvider.setBaseMessage({ fadeout: 800 }); // TODO : per channel

  }]);
```

In your applications template, subscribe to a channel (this example is Bootstrap friendly HTML):

```html
<div ng-controller="NotificationsCtrl">
  <div ng-repeat="msg in flash" class="alert alert-{{msg.type}}" id="notification-{{msg.id}}"> TODO : channel.flash as to avoid namespace clash
    <div class="container">
      <span ng-bind-html-unsafe="msg.message"></span>
      <button class="close" ng-click="destroy('flash', msg.id)">×</button>
    </div>
  </div>
</div>
```

And finally, trigger a new notification on your channel as apt:

```javascript
Notifications.post('flash',{
  message: "It worked! AMAZE!",
  type: 'success',
  timeout: 2500
});
```

## Options TODO

timeout

### Continuous Integration

TODO

### Contribute

You can use grunt to both test and lint your code.

```
# Inside the project folder, install the dependencies
$ npm install

# Run the tests
$ grunt
```

## Bug Reports

Github Issues are used for managing bug reports and feature requests. If you run into issues, please search the issues and submit new problems. The best way to get quick responses to your issues and swift fixes to your bugs is to submit detailed bug reports, include test cases

## License

Copyright (c) 2014 Dave Stone. MIT Licensed, see [LICENSE](LICENSE.md) for details.
