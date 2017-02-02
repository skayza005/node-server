(function() {
  "use strict"

  angular.module('monitorApp', ['ngMaterial'])
    .controller('MonitorCtrl', ['$http', '$interval', MonitorCtrl])

  function MonitorCtrl($http, $interval) {
    var monitor = this;
    monitor.tiles = [];
    monitor.correctionDict = {};
    monitor.update = function() {
      monitor.tiles.forEach(function(tile) {
        $http({
          method: 'get',
          url: `../uploads/correction.json?dummy=${Math.random()}`
        }).then(function(resp) {
          resp.data.forEach(function(image) {
            monitor.correctionDict[image.hash] = image.correct;
          });
        }, function() {
          monitor.correctionDict = {};
        });
        $http({
          method: 'get',
          url: `../uploads/${tile.hash}.img?dummy=${Math.random()}`
        }).then(function(resp) {
          tile.imgStyles = {
            'background-image': `url(${resp.data})`
          }
          if (monitor.correctionDict[tile.hash] === true) {
            tile.imgStyles['background-color'] = '#C5E0B4';
          } else if(monitor.correctionDict[tile.hash] === false) {
            tile.imgStyles['background-color'] = '#F8CBAD';
          }
        }, function(resp) {
          tile.imgStyles = {};
        });
      });
    }

    $http({
      method: 'get',
      url: `app/config.json?dummy=${Math.random()}`
    }).then(function(resp) {
      resp.data.forEach(function(tile) {
        tile.imgStyles = {};
        monitor.tiles.push(tile);
      });
      monitor.update();
      $interval(monitor.update, 1500);
    });
  }
})();
