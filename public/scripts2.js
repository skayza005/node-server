﻿// Generated by CoffeeScript 1.11.1

    ////////////////////////////
    /* ***********
    */
    var temp_tablet = '2';
    /* 
    **************/
    ////////////////////////

  var App = {};
  var drawing;
  var mousePos;
  var lastPos;
  var rect;
  var drawingByAnother ;

  /*
  	Init
   */
  
  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App.init = function () {
      
      App.canvas = document.getElementById('myCanvas');
      

      rect = document.getElementById('myCanvas').getBoundingClientRect();
      buttonClear = document.getElementById('clear');
      drawingByAnother = false;
      drawing = false;
      mousePos = { x: 0, y: 0 };
      lastPos = mousePos;

    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#ECD018";
    App.ctx.lineWidth = 2;
    App.ctx.lineCap = "round";

    App.socket = io();
    App.socket.on('draw' + temp_tablet, function (data) {
        console.log('rec ' + JSON.stringify(data));

        if (isset(data,"clear") ) { return ClearData(App.ctx,App.canvas); }
        else {
            
            //console.log('rec: ' + data.lP.x + ' ' + data.lP.y + ' ' + data.mP.x + ' ' + data.mP.y);

            lastPos = data.lP;
            mousePos = data.mP
            drawingByAnother = true;
            renderCanvas();
            drawingByAnother = false;
        }
    });
    buttonClear.onclick = function () { ClearData(App.ctx, App.canvas); App.socket.emit('tablet1', { clear: true }); };
      /////////////////////////////
      //////mouse 
      ////////////////////////////
    {
        {
            {
                canvas.addEventListener("mousedown", function (e) {
                    drawing = true;
                    App.ctx.beginPath();
                    lastPos = getMousePos(canvas, e);
                }, false);
                canvas.addEventListener("mouseup", function (e) {
                    drawing = false;
                }, false);
                canvas.addEventListener("mousemove", function (e) {
                    if (drawing) {

                        mousePos = getMousePos(canvas, e);
                        sentPoint();
                        renderCanvas();
                        
                    }

                }, false);

                // Get the position of the mouse relative to the canvas
                function getMousePos(canvasDom, mouseEvent) {
                    var rect = canvasDom.getBoundingClientRect();
                    return {
                        x: mouseEvent.clientX - rect.left,
                        y: mouseEvent.clientY - rect.top
                    };
                }
            }
        }
    }
    /////////////////////////////
    //////touch
    ////////////////////////////
    {
        {
            {

                canvas.addEventListener("touchstart", function (e) {
                    drawing = true;
                    App.ctx.beginPath();
                    lastPos = getTouchPos(canvas, e);
                }, false);
                canvas.addEventListener("touchend", function (e) {
                    drawing = false;
                }, false);
                canvas.addEventListener("touchmove", function (e) {
                    var touch = e.touches[0];
                    mousePos = getTouchPos(canvas, e);
                    sentPoint();
                    renderCanvas();
                }, false);
            
                  // Get the position of a touch relative to the canvas
                function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }
            }
        }
    }

      // ไม่ให้เลื่อน
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);    
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);


    function sentPoint() {
        console.log('sent: ' + lastPos.x + ' ' + lastPos.y + ' ' + mousePos.x + ' ' + mousePos.y)
        App.socket.emit('tablet' + temp_tablet, {
            lP: lastPos,
            mP: mousePos
        });
    }
    function renderCanvas() {
        if (drawing || drawingByAnother) {
            App.ctx.moveTo(lastPos.x, lastPos.y);
            App.ctx.lineTo(mousePos.x, mousePos.y);
            App.ctx.stroke();
            lastPos = mousePos;
        }
    }
    function ClearData(context , canvas) {

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        
    }
      
  };



  $(function() {
    return App.init();
  });

  function isset(obj, prop) {
      return typeof obj !== 'undefined' ? obj.hasOwnProperty(prop) : false;
  }
  
  

  
  function countdown(secs) {
      var THROTTLE_AMOUNT = 10;
      var milli = secs * (1000);
      var counter = setInterval(function () {
          if (milli <= 0) {
              clearInterval(counter);
              return
          }
          milli -= THROTTLE_AMOUNT;
          document.getElementById("time-min").innerHTML = parseInt(milli / 1000 / 60);
          document.getElementById("time-sec").innerHTML = ":  " + parseInt(milli / 1000)+"  :";
          document.getElementById("time-mil").innerHTML = parseInt(milli %1000)/10; // watch for spelling
      }, THROTTLE_AMOUNT);
  }
