(function() {
  "use strict"

  angular.module('monitorApp', ['ngMaterial'])
    .controller('AppCtrl', ['$http', '$interval', '$timeout', AppCtrl])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('green');
    })

  function AppCtrl($http, $interval, $timeout) {
    var app = this;
    app.getImages = function() {
      if (app.images === undefined) {
        app.images = [{}, {}, {}, {}, {}, {}, {}, {}];
      }
      app.teams.forEach(function(team, index) {
        app.images[index].teamName = team.team;
        app.images[index].hash = team.hash;
        $http({
          method: 'get',
          url: `../uploads/${team.hash}.img?dummy=${Math.random()}`
        }).then(function(resp) {
          if (resp.data != app.images[index].data) {
            app.images[index].correct = undefined;
            app.images[index].style = {};
          }
          app.images[index].data = resp.data;
        }, function(resp) {
          app.images[index].correct = undefined;
          app.images[index].style = {};
          app.images[index].data = 'data:';
        });
      });
    };
    $http({
      method: 'get',
      url: `../monitor/app/config.json?dummy=${Math.random()}`
    }).then(function(resp) {
      app.teams = resp.data;
      app.getImages();
      $interval(app.getImages, 2000);
    });
    app.send = function(x) {
      var dataToSend = [];
      app.images.forEach(function(image) {
        dataToSend.push({
          correct: image.correct,
          hash: image.hash
        })
      });
      $http({
        method: 'post',
        url: 'update.php',
        data: dataToSend
      }).then(function(resp) {
        app.sending = '';
        alert('Sent');
      }, function() {
        alert('Error');
      });
    };
    app.resetBackgorund = function() {
      $http({
        method: 'post',
        url: 'reset-background.php',
      }).then(function(resp) {
        app.reseting = '';
        alert('Background reset');
      }, function(resp) {
        alert('Error');
      });
    };
  }
})();
