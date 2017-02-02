///// ระวัง score กด true หลายรอบ ปั้มคะแนน
//// ระวัง ชื่อทีม อาเรย์ ยังงงๆ
///  จบข้อ อย่าลืมรีเซ็ท อาเรย์time , หรืออะไรก้แล้วแต่



var express = require('express');
var app = express();
var path = require('path');
var colors = require('colors');
var port = 8080;
var team ;
var team_config  ;
var team_name  ;
var team_num ;
var score ;
var time_submit = [0,0,0,0,0,0,0,0] ;
var  temp_judge = [0,-1,-1,-1,-1,-1,-1,-1]; // -1 คือ ยัไม่ตรวจ 0 คือผิด 1คือถูก
var status ;

function getJstoNode(){
  team = [];
  status = [];
  team_config  = require("./public/team.json");
  team_name  = [];
  team_num = team_config._data_team.length;
  score = [];
  option_score =[-10,-10,-10,-10,-10,-10,-10,-10] ;
  time_submit = [0,0,0,0,0,0,0,0] ;
  temp_judge = [0,-1,-1,-1,-1,-1,-1,-1];
  for( var i =0 ;i<team_config._data_team.length ; i++  ){

    team_name[i] = team_config._data_team[i].name ;
    team[i] = team_config._data_team[i].id ;
    score[i] = team_config._data_team[i].score ;
    status[i] = parseInt(team_config._data_team[i].status) ;
  }
  console.log(status);

}



function update_team_config_to_js_file(){
  time_submit = [0,0,0,0,0,0,0,0] ;
  temp_judge = [0,-1,-1,-1,-1,-1,-1,-1];
  option_score =[-10,-10,-10,-10,-10,-10,-10,-10] ;
  for( var i =1 ;i<team_config._data_team.length ; i++  ){
    //console.log(i);
     team_config._data_team[i].name = team_name[i] ;
     team_config._data_team[i].id = team[i]  ;
     team_config._data_team[i].score = score[i]  ;
     team_config._data_team[i].status = status[i]  ;
  }
  console.log( team_config ) ;
  var fs = require('fs');
  //var file = require"./public/team.js");
  fs.writeFileSync("./public/team.json", JSON.stringify(team_config));

}


var server = app.listen(port, function() {

    getJstoNode();
    console.log('Listening on port: '.green + port);
    //console.log(team_name) ;
});
var io = require('socket.io').listen(server);

/////////
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
////////







app.get('/', function(req, res) {
    //res.render('index');
});
app.get('/tablet/:id', function (req, res) {
    console.log(colors.bgMagenta('tablet'+req.params.id)+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render( './tablet/1/index.tablet.ejs' , { text1:req.params.id,name:team_name[req.params.id] ,status:status } );
});
app.get('/control/', function (req, res) {
    console.log(colors.bgMagenta('controller')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./control/index.control.ejs' , { team_num:team_num , score:score , team_name:team_name ,status:status } );
});
app.get('/control20/', function (req, res) {
    console.log(colors.bgMagenta('controller20')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./control/index.control20.ejs' , { team_num:team_num , score:score , team_name:team_name ,status:status } );
});
app.get('/control_last/', function (req, res) {
    console.log(colors.bgMagenta('controller20')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./control/index.control_last.ejs' , { team_num:team_num , score:score , team_name:team_name ,status:status } );
});
app.get('/judge/', function (req, res) {
  console.log(colors.bgMagenta('judge')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./judge/index.judge.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status });
});
app.get('/judge20/', function (req, res) {
  console.log(colors.bgMagenta('judge20')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./judge/index.judge20.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status });
});
app.get('/judge_last/', function (req, res) {
  console.log(colors.bgMagenta('judge')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./judge/index.judge_last.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status });
});
app.get('/monitor/', function (req, res) {
  console.log(colors.bgMagenta('monitor')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./monitor/index.monitor.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status });
});
app.get('/monitor_last/', function (req, res) {
  console.log(colors.bgMagenta('monitor')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./monitor/index.monitor_last.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status });
});
app.get('/scoreboard/', function (req, res) {
  console.log(colors.bgMagenta('scoreboard')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./scoreboard/index.scoreboard.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status } );
});
app.get('/scoreboard_last/', function (req, res) {
  console.log(colors.bgMagenta('scoreboard')+'  ip: ' + colors.bgRed(req.ip)+' '+req.hostname);
    res.render('./scoreboard/index.scoreboard_last.ejs', { team_num:team_num , score:score , team_name:team_name ,status:status } );
});
app.get('/mix/', function (req, res) {
  var open = require('open');
  open('http://localhost:' + port + '/tablet/1' , 'chrome');
  open('http://localhost:' + port + '/control' , 'chrome');
  open('http://localhost:' + port + '/scoreboard/' , 'chrome');
  open('http://localhost:' + port + '/monitor/' , 'chrome');
  open('http://localhost:' + port + '/judge/' , 'chrome');


});




 ////////////////////////////////////////////////////
io.on('connection', function (socket) {
    /// ถ้ามีคนconnect จะทำข้างในนี้
    //console.log('connect');


        ////////controller
        socket.on('controller', function (data) {
            console.log(JSON.stringify(data).red);
            if ( isset(data , "option_score") ) {
                option_score[data.team_tab] = data.option_score ;
            }
            if ( isset(data , "sentResult_20") ) {
                // ได้รับจาก controller ว่า ต้องการโชว์ผลเฉลยจากอาจารย์
                console.log('sent monitor '+temp_judge);
                socket.broadcast.emit('monitor', { temp_judge:temp_judge , time_submit:time_submit });
            }
            if ( isset(data , "updateScore_20") ) {
                // ได้รับจาก controller ว่า ต้องการ update scoreboard
                for(var i=1 ; i<=team.length ; i++ ){
                  if(status[i]=="0" || option_score[i]==-10 )continue;
                  else  score[ i ] = CalScore20( i  ) ;
                }

                // save ลง js
                update_team_config_to_js_file();

                socket.broadcast.emit('scoreboard', { updateScore:true ,score:score });
            }
            if ( isset(data , "updateScore_last") ) {
                // ได้รับจาก controller ว่า ต้องการ update scoreboard
                for(var i=1 ; i<=4 ; i++ ){
                  if(status[i]=="0")continue;
                  else  score[ i ] = CalScore_last( i , temp_judge[i] ) ;
                }

                // save ลง js
                update_team_config_to_js_file();

                socket.broadcast.emit('scoreboard', { updateScore:true ,score:score });
            }

            if ( isset(data , "resetAndNext") ) {

                team.forEach(function (ev) {
                    socket.broadcast.emit('draw' + ev, { refresh:true });
                });
                socket.broadcast.emit('judge', { refresh:true });
                socket.broadcast.emit('controller', { refresh:true });
                socket.broadcast.emit('monitor', { refresh:true });
                socket.broadcast.emit('scoreboard', { refresh:true });
                //socket.broadcast.emit('judge', { refresh:true });
            }

            if ( isset(data , "sentResult") ) {
                // ได้รับจาก controller ว่า ต้องการโชว์ผลเฉลยจากอาจารย์
                console.log('sent monitor '+temp_judge);
                socket.broadcast.emit('monitor', { temp_judge:temp_judge , time_submit:time_submit });
            }
            if ( isset(data , "updateScore") ) {
                // ได้รับจาก controller ว่า ต้องการ update scoreboard
                for(var i=1 ; i<=team.length ; i++ ){
                  if(status[i]=="0")continue;
                  else  score[ i ] = CalScore( i , temp_judge[i] ) ;
                }

                // save ลง js
                update_team_config_to_js_file();

                socket.broadcast.emit('scoreboard', { updateScore:true ,score:score });
            }
            if ( isset(data , "saveStatus") ) {
                // save ลง js
                update_team_config_to_js_file();
            }
            if ( isset(data , "updateStatus") ) {
                // ได้รับจาก controller ว่า ต้องการ update scoreboard

                  status[data.team] = parseInt(data.status) ;

                console.log(status);


            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////
            if ( isset(data , "resetTime") ) { ///// reset เวลา
                team.forEach(function (ev) {
                    socket.broadcast.emit('draw' + ev, {resetTime:data.resetTime});
                });
            }
            if ( isset(data , "startTime") ) { ///// reset เวลา
                team.forEach(function (ev) {
                    socket.broadcast.emit('draw' + ev, {startTime:data.startTime});
                });
            }
            if ( isset(data , "begin_Path") ) { ///// reset เวลา
                team.forEach(function (ev) {
                    socket.broadcast.emit('draw' + ev, {begin_Path:true});
                });
            }
            if ( isset(data , "stop") ) { ///// reset เวลา
                team.forEach(function (ev) {
                    socket.broadcast.emit('draw' + ev, {stop:true});
                });
            }
        });

        ////////jugde
        socket.on('judge', function (data) {
            // รับขอมูลจาก judge เป็น ถูกผิด -> ปรับ คะแนน database
            // -> ส่งว่าถูกผิด ไปที่ monitor , ถูกผิดไปที่ scoreboard , คะแนนไปที่ scoreboard
            console.log(JSON.stringify(data).green);
            if ( isset(data , "result") ) { ///// ได้ผลscore ทีละทีม
                // database record score

                temp_judge[data.tablet] = ( data.result ) ? 1: 0 ;
                //ไม่ต้อง cal รอcal ตอนcontrollerกดอัพเดทscore //score[ data.tablet ] = CalScore( data.tablet , data.result ) ;
                console.log ( '*judge* team : '.blue+data.tablet+' score:'+temp_judge[ data.tablet ]  )
                // ส่ง ผล ไป controller
                socket.broadcast.emit('controller', {tablet:data.tablet,result:data.result,score:score[data.tablet] , time:time_submit[data.tablet]});

            }

        });




        ////////tablet
        team.forEach(function (ev) {
            socket.on('tablet' + ev, function (data) {

                var temp;
                if ( isset(data , "clear") ) {
                    console.log('server recieve: tablet'.green+ev+'  :clear '+JSON.stringify(data));
                    socket.broadcast.emit('draw' + ev, {clear:true});
                }
                else if (isset(data, "submit")) {
                    console.log('server recieve: '+colors.bgRed.green('tablet'+ev)+'  :submit ');
                    // save รูป  , time
                    time_submit[ev] = parseInt(data.sent_Time) ;
                    // ส่ง monitor ว่าsubmit
                    socket.broadcast.emit('monitor', {tablet:ev , submit:true , time :parseInt(data.sent_Time) , img:data.img });
                    // ส่ง judge ว่า submit
                     socket.broadcast.emit('judge', {tablet:ev , submit:true , time :parseInt(data.sent_Time), img:data.img  });
                     console.log('server sent->judge , monitor : tablet'.green+ev+' time '+parseInt(data.sent_Time)+' '+data.sent_Time);
                }
                else {
                    console.log('server recieve: tablet'.green+ev+'  :point '+JSON.stringify(data));
                    socket.broadcast.emit('draw' + ev, { lP: data.lP , mP:data.mP });
                }
                //socket.broadcast.emit('draw' + ev,temp);
            });
        });



});
////////////////////////////////////////////////////

function isset(obj, prop) {
    return typeof obj !== 'undefined' ? obj.hasOwnProperty(prop) : false;
}
function CalScore ( team , result ){
        if(result== -1) return parseInt(score[ team ]) ;
        tt = time_submit[team]/1000 ;
        var score_temp  ;
        if( tt >= 50 )score_temp = 20 ;
        else if( tt >= 40 )score_temp = 18 ;
        else if( tt >= 30 )score_temp = 16 ;
        else if( tt >= 20 )score_temp = 14 ;
        else if( tt >= 10 )score_temp = 12 ;
        else if( tt >= 0 )score_temp = 10 ;

        console.log('server cal score: tablet'+team+'  =  '+ (parseInt(score[ team ]) + parseInt(result*score_temp)) );
            return parseInt(score[ team ]) + parseInt(result*score_temp) ;
}
function CalScore20 ( team  ){ // 1 , 1(true) 0(false) -1(ไม่มีผล)

          return parseInt(score[ team ]) + parseInt( option_score[team] ) ; // +3 , +2

}
function CalScore_last(team , result){ // +10 -20%
  if(result== -1) return score[ team ] ;
  if( result==1 ){
    return parseFloat(score[ team ]) + parseInt( 10 ) ;
  }
  if( result==0 ){
    return parseInt(   Math.round( (parseFloat(score[ team ]) - parseFloat(score[ team ])*0.2)*10 )   )/10  ;
  }
}
