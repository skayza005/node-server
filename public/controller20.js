﻿// Generated by CoffeeScript 1.11.1

    ////////////////////////////
    /* ***********
    */


  var App = {};
  var drawing;
  var mousePos;
  var lastPos;
  var rect;
  var drawingByAnother;
  var bool_sent = 0;

  /*
  	Init
   */
   $(function() {
      for(var i=1 ; i<team_num ; i++){
        $('#name'+i).html(team_name[i]);
        $('#score'+i).html(team_score[i]);
        if( team_status[i]==1){$('#status'+i).css("background-color", "#286090");  }
        else {$('#status'+i).css("background-color", "#ddd");  }
        //$('#status'+i).html(team_status[i]);
      }
      console.log(team_status);

   });

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่

  App.init = function () {

    App.socket = io();
    App.socket.on('controller', function (data) {
        console.log( JSON.stringify(data));
         /*if (isset(data,"result") ) {
             //$('#score_new'+data.tablet).html(data.time/1000) ;
             $('#time'+data.tablet).html(data.time/1000) ;
             if( data.result ){
               // ถูก ก้เปิดให้คลิกว่าจะเป็น +3 หรือ +2

               $('#opt_true_1_'+data.tablet).removeClass('hidden');
               $('#opt_true_2_'+data.tablet).removeClass('hidden');
             }
             else {

               $('#opt_false_1_'+data.tablet).removeClass('hidden');
               $('#opt_false_2_'+data.tablet).removeClass('hidden');
             }

          }*/
          if (isset(data,"refresh") ) {
             location.reload() ;

          }
/*
        if (isset(data,"clear") ) { return ClearData(App.ctx,App.canvas); }
        if (isset(data,"resetTime") ) { resetTime(); }

        else {

            //console.log('rec: ' + data.lP.x + ' ' + data.lP.y + ' ' + data.mP.x + ' ' + data.mP.y);

            lastPos = data.lP;
            mousePos = data.mP
            drawingByAnother = true;
            renderCanvas();
            drawingByAnother = false;
        }
        */
    });
    /*
    reset_time.onclick = function () { App.socket.emit('controller', { resetTime: '60' }); };
    start_time.onclick = function () { App.socket.emit('controller', { startTime: '60' }); };
    stop_time.onclick = function () { App.socket.emit('controller', { stop: true }); };
    sent_result.onclick = function () { App.socket.emit('controller', { sentResult_20: true }); };
    save_status.onclick = function () { App.socket.emit('controller', { saveStatus: true ,status:status}); };
    */
    update_score.onclick = function () { App.socket.emit('controller', { updateScore_20: true });  };

    reset_new.onclick = function () { App.socket.emit('controller', { resetAndNext: true });location.reload() ; };

      /////////////////////////////
      //////mouse
      ////////////////////////////



  };

  function sentOption(team , opt ){
    App.socket.emit('controller', { team_tab:team , option_score:parseInt(opt)  });
    if( parseInt(opt)>0 ){$('#newscore'+team).html( '-> '+opt );$('#newscore'+team).addClass('bg-success');  }
    else {$('#newscore'+team).html( '-> '+opt );$('#newscore'+team).addClass('bg-danger');  }
    $('#sumscore'+team).html(team_score[team]+parseInt(opt));
  }
  function updateStatus(team , sss ){
    App.socket.emit('controller', { updateStatus: true ,team:team ,status:sss }) ;
    if( sss==1){$('#status'+team).css("background-color", "#286090");  }
    else {$('#status'+team).css("background-color", "#ddd");  }
  }




  $(function() {
    return App.init();
  });

  function isset(obj, prop) {
      return typeof obj !== 'undefined' ? obj.hasOwnProperty(prop) : false;
  }




  function resetScreen() {

  }
