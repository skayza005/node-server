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
    for(var i=1 ; i<=4 ; i++){
      $('#name_team'+i).html(team_name[i]);
      if( team_status[i]==0 )$('#myCanvas'+i).addClass('bg-disable');
    }

    App.socket = io();
    App.socket.on('monitor', function (data) {

        console.log('rec submit' + JSON.stringify(data));


        if (isset(data,"temp_judge") ) {
          for(var i=1 ; i<data.temp_judge.length ; i++){
            if( data.temp_judge[i]==1 ){$('#myCanvas'+i).addClass('bg-success');}
            if( data.temp_judge[i]==0 ){$('#myCanvas'+i).addClass('bg-danger');}
            if( data.temp_judge[i]==-1 ){$('#myCanvas'+i).addClass('bg-disable');}
          }
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
