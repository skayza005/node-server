
var height_canvas = 240;
var width_canvas = 360 ;
// Generated by CoffeeScript 1.11.1

    ////////////////////////////
    /* ***********
    */

    /*
    **************/
    function imageToDataUri(data, width, height) {

    // create an off-screen canvas
    var canvasA = document.createElement('canvas'),
        ctxA = canvasA.getContext('2d');

    // set its dimension to target size
    canvasA.width = width;
    canvasA.height = height;

    // draw source image into the off-screen canvas:
    var img = new Image();
    img.src = data ;

    ctxA.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvasA.toDataURL();
}
    ////////////////////////
// temp_tablet

  var App_1 = {};
  var drawing_1;
  var mousePos_1;
  var lastPos_1;
  var rect_1;
  var drawingByAnother_1;
  var bool_sent_1 = 0;
  var counter_1 ;
  var milli_1 ;

  /*
  	Init
   */

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App_1.init = function () {

      App_1.canvas = document.getElementById('myCanvas1');


      rect_1 = document.getElementById('myCanvas1').getBoundingClientRect();

    App_1.ctx = App_1.canvas.getContext("2d");
    App_1.ctx.fillStyle = "solid";
    App_1.ctx.strokeStyle = "black";
    App_1.ctx.lineWidth = 4;
    App_1.ctx.lineCap = "round";

    App_1.socket = io();
    App_1.socket.on('monitor', function (data) {

        console.log('rec ' + JSON.stringify(data));

        if (isset(data,"submit") ) {
          if( data.tablet=="1" ){
            var img = new Image;
            img.src = imageToDataUri(data.img,width_canvas,height_canvas);
            console.log("aa "+data.img);
            img.onload = function(){

              App_1.ctx.drawImage( img ,0,0);

              // Or at whatever offset you like
              //console.log(width_canvas+' '+height_canvas) ;
            };
          }


        }
    });




  };

  ////////////////////////
  // temp_tablet

  var App_2 = {};
  var drawing_2;
  var mousePos_2;
  var lastPos_2;
  var rect_2;
  var drawingByAnother_2;
  var bool_sent_2 = 0;
  var counter_2 ;
  var milli_2 ;

  /*
  Init
  */

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App_2.init = function () {

    App_2.canvas = document.getElementById('myCanvas2');


    rect_2 = document.getElementById('myCanvas2').getBoundingClientRect();

  App_2.ctx = App_2.canvas.getContext("2d");
  App_2.ctx.fillStyle = "solid";
  App_2.ctx.strokeStyle = "black";
  App_2.ctx.lineWidth = 4;
  App_2.ctx.lineCap = "round";

  App_2.socket = io();
  App_2.socket.on('monitor', function (data) {

      console.log('rec ' + JSON.stringify(data));

      if (isset(data,"submit") ) {

        if( data.tablet=="2" ){
          var img = new Image;
          img.src = imageToDataUri(data.img,width_canvas,height_canvas);
          console.log("aa "+data.img);
          img.onload = function(){

            App_2.ctx.drawImage( img ,0,0);

            // Or at whatever offset you like
            //console.log(width_canvas+' '+height_canvas) ;
          };
        }


      }
  });




  };
  ////////////////////////
  // temp_tablet

  var App_3 = {};
  var drawing_3;
  var mousePos_3;
  var lastPos_3;
  var rect_3;
  var drawingByAnother_3;
  var bool_sent_3 = 0;
  var counter_3 ;
  var milli_3 ;

  /*
  Init
  */

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App_3.init = function () {

    App_3.canvas = document.getElementById('myCanvas3');


    rect_3 = document.getElementById('myCanvas3').getBoundingClientRect();

  App_3.ctx = App_3.canvas.getContext("2d");
  App_3.ctx.fillStyle = "solid";
  App_3.ctx.strokeStyle = "black";
  App_3.ctx.lineWidth = 4;
  App_3.ctx.lineCap = "round";

  App_3.socket = io();
  App_3.socket.on('monitor', function (data) {

      console.log('rec ' + JSON.stringify(data));

      if (isset(data,"submit") ) {

        if( data.tablet=="3" ){
          var img = new Image;
          img.src = imageToDataUri(data.img,width_canvas,height_canvas);
          console.log("aa "+data.img);
          img.onload = function(){

            App_3.ctx.drawImage( img ,0,0);

            // Or at whatever offset you like
            //console.log(width_canvas+' '+height_canvas) ;
          };
        }


      }
  });




  };
  ////////////////////////
  // temp_tablet

  var App_4 = {};
  var drawing_4;
  var mousePos_4;
  var lastPos_4;
  var rect_4;
  var drawingByAnother_4;
  var bool_sent_4 = 0;
  var counter_4 ;
  var milli_4 ;

  /*
  Init
  */

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App_4.init = function () {

    App_4.canvas = document.getElementById('myCanvas4');


    rect_4 = document.getElementById('myCanvas4').getBoundingClientRect();

  App_4.ctx = App_4.canvas.getContext("2d");
  App_4.ctx.fillStyle = "solid";
  App_4.ctx.strokeStyle = "black";
  App_4.ctx.lineWidth = 4;
  App_4.ctx.lineCap = "round";

  App_4.socket = io();
  App_4.socket.on('monitor', function (data) {

      console.log('rec ' + JSON.stringify(data));

      if (isset(data,"submit") ) {

        if( data.tablet=="4" ){
          var img = new Image;
          img.src = imageToDataUri(data.img,width_canvas,height_canvas);
          console.log("aa "+data.img);
          img.onload = function(){

            App_4.ctx.drawImage( img ,0,0);

            // Or at whatever offset you like
            //console.log(width_canvas+' '+height_canvas) ;
          };
        }


      }
  });




  };




  $(function() {
    App_1.init();
    App_2.init();
    App_3.init();
    App_4.init();

  });
  $(function() {

  });
  function isset(obj, prop) {
      return typeof obj !== 'undefined' ? obj.hasOwnProperty(prop) : false;
  }
