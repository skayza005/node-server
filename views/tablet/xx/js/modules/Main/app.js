requirejs([
    "EasySketch/Sketch",
    "EasySketch/Addon/Redo",
    "EasySketch/Addon/Undo",
    "EasySketch/Addon/UndoRedoDataStore"
], function (Sketch, RedoAddon, UndoAddon, UndoRedoDataStore) {

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  var lineWidth = 5;
  var canvasWidth = 975;
  var canvasHeight = 590;

  $('#canvas').css('width', canvasWidth);
  $('#canvas').css('height', canvasHeight);
  $('#drawing-canvas').attr('width', canvasWidth);
  $('#drawing-canvas').attr('height', canvasHeight);

  var sketcher = new Sketch("#drawing-canvas", {doubleBuffering: true});

  // Initializing the addons
  var urDataStore = new UndoRedoDataStore(sketcher);
  var undo = new UndoAddon(urDataStore);
  // var redo = new RedoAddon(urDataStore);

  sketcher.registerAddon(undo);
  // sketcher.registerAddon(redo);

  // Disables the eraser
  // $('#pencil').on('click', function () {
  //     sketcher.setOptions({width: lineWidth, color: "black"});
  // });
  //
  // // Enables the eraser
  // $('#eraser').on('click', function () {
  //     sketcher.setOptions({width: lineWidth*7, color: "white"});
  // });

  // Clear button
  $('#clear').on('click', function () {
      sketcher.clear();
      urDataStore.reset();
      document.getElementById('status').innerHTML = 'Cleared';
  });

  // Undo button
  $("#undo").on('click', function () {
      undo.execute();
  });

  // // Redo button
  // $("#redo").on('click', function () {
  //     redo.execute();
  // });

  $("#submit").on('click', function() {
    document.getElementById('status').innerHTML = 'Submitting...';
    $("#circle").show().slideUp(800);
    $.ajax({
      type: 'POST',
      url: 'upload.php',
      data: {
        image: $('#drawing-canvas')[0].toDataURL('image/png'),
        hash: getUrlParameter("hash"),
      }
    })
    .done(function() {
      document.getElementById('status').innerHTML = 'Submitted';
    })
    .fail(function() {
      alert('Error.\nDO NOT TOUCH ANYTHING!\nPlease raise your hand.');
    })
    .always(function() {
    });
  });

  // Predefined line
  sketcher.setOptions({alpha: 1, width: lineWidth});

  // An event that is triggered when the user draws on the canvas
  // (this does not trigger when the DRAW_EVENT is called via the event manager)
  // sketcher.getEventManager().attach(Sketch.NOTIFY_PAINT_EVENT, function (event) {
  //     console.log('drawing at ' + JSON.stringify(event.getParam(0)));
  // });
});
