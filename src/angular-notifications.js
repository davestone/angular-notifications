(function () {
  "use strict";

  angular.module('davestone.notifications', [])
    .provider('Notifications', function() {
      // Configuration
      this.channelNames = [];
      this.baseMessage = {
        fadeout: 0,
        timeout: 0,
        message: ""
      };

      this.setChannels = function(channelNames) {
        this.channelNames = channelNames;
      };

      this.setBaseMessage = function(baseMessage) {
        this.baseMessage = baseMessage;
      };

      // Service
      this.$get = ['$timeout', function($timeout) {
        var self = this,
            service = {};

        // init queues
        angular.forEach(self.channelNames, function(channelName, i) {
          if (service[channelName] === undefined) service[channelName] = [];
        });

        service.post = function(channelName, overloadMessage) {
          var message = {};
          angular.extend(message, self.baseMessage);
          angular.extend(message, overloadMessage);

          // no id? Generate a unique one
          if (message.id === undefined) message.id = Math.floor(Math.random()* 1000000);

          // push to queue
          service[channelName].push(message);

          // timeout
          if (message.timeout > 0) {
            $timeout(function() {
              service.destroy(channelName, message.id);
            }, message.timeout);
          }
        };

        service.destroy = function(channelName, messageID) {
          angular.forEach(service[channelName], function(message, i) {
            if (message.id == messageID) {
              // a fadeout?
              if (message.fadeout > 0) {
                $('#notification-'+message.id).fadeOut(message.fadeout); // TODO : unHACK this; should be hard referencing #id's like that.
              }
              // then kill it
              $timeout(function() {
                service[channelName].splice(i, 1);
              }, message.fadeout);
              return true;
            }
          });
          return false;
        };

        service.channels = self.channelNames;

        service.channel = function(channelName) {
          return service[channelName];
        };

        return service;
      }];
    })

    .controller('NotificationsCtrl', ['$scope', 'Notifications',
      function($scope, Notifications) {

        angular.forEach(Notifications.channels, function(channelName, i) {
          $scope[channelName] = Notifications.channel(channelName);
        });

        $scope.destroy = Notifications.destroy;

      }
    ]);

}());
