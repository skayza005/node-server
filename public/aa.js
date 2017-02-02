////////////////////////
// temp_tablet

var App_7 = {};
var drawing_7;
var mousePos_7;
var lastPos_7;
var rect_7;
var drawingByAnother_7;
var bool_sent_7 = 0;
var counter_7 ;
var milli_7 ;

/*
Init
*/

///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

App_7.init = function () {

  App_7.canvas = document.getElementById('myCanvas1');


  rect_7 = document.getElementById('myCanvas1').getBoundingClientRect();

App_7.ctx = App_7.canvas.getContext("2d");
App_7.ctx.fillStyle = "solid";
App_7.ctx.strokeStyle = "black";
App_7.ctx.lineWidth = 4;
App_7.ctx.lineCap = "round";

App_7.socket = io();
App_7.socket.on('monitor', function (data) {

    console.log('rec ' + JSON.stringify(data));

    if (isset(data,"submit") ) {

      var img = new Image;
      img.src = imageToDataUri(data.img,width_canvas,height_canvas);
      console.log("aa "+data.img);
      img.onload = function(){

        App_7.ctx.drawImage( img ,0,0);

        // Or at whatever offset you like
        //console.log(width_canvas+' '+height_canvas) ;
      };


    }
});




};
