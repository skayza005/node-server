// Generated by CoffeeScript 1.11.1

    ////////////////////////////
    /* ***********
    */

    /*
    **************/
    ////////////////////////
  /*
  	Init
   */

  ///// อาจมีฟังชั่น redraw เวลารีเฟรชใหม่
var App ={} ;
  App.init = function () {

    App.socket = io();
    App.socket.on('judge', function (data) {

        console.log('rec submit' + JSON.stringify(data));


        if (isset(data,"submit") ) {
          // 1. เปิดให้กดปุ่ม ถูกผิด
           $('#button_true_'+data.tablet).removeClass('disabled');
           $('#button_false_'+data.tablet).removeClass('disabled');
          // 2. อัพเดท สถานะ
          // 3. จำ เวลา
            //  data.tablet
            //  data.time

        }
        if (isset(data,"refresh") ) {
           location.reload() ;

        }
    });


  };



  $(function() {
    return App.init();
  });

  function isset(obj, prop) {
      return typeof obj !== 'undefined' ? obj.hasOwnProperty(prop) : false;
  }



  function sentResult(bool,i) {
      if(bool== true){$('#row'+i).addClass('bg-success');$('#row'+i).removeClass('bg-danger');}
      else {$('#row'+i).addClass('bg-danger');$('#row'+i).removeClass('bg-success');}
      App.socket.emit('judge', { tablet:i ,result:bool });
      console.log('sent : tablet '+i+' : '+bool);

  }
