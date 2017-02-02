(function() {
  "use strict"

  angular.module('monitorApp', ['ngMaterial'])
    .controller('MonitorCtrl', ['$http', '$interval', MonitorCtrl])

  function MonitorCtrl($http, $interval) {
    var monitor = this;
    monitor.tiles = [];
    monitor.imgStyles = [];
    var update = function() {
      $http({
        method: 'GET',
        url: 'update.php'
      }).then(function(resp) {
        var first = false;
        if (monitor.tiles.length == 0) {
          first = true;
        }
        resp.data.forEach(function(tile, index) {
          var imgStyle = {};
          if (tile.picName.split('_')[1] != 'fail') {
            imgStyle = {
              'background-image': 'url(../uploads/'+ tile.picName +'.png)'
            };
          }
          if (first) {
            monitor.tiles.push(tile);
          }
          monitor.imgStyles[index] = imgStyle;
        });
      });
    };
    update();
    $interval(update, 3000);
  }

})();
