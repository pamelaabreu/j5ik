var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
    io: new Tessel()
});

var ledOnLoop = function (){
    var leds = new five.Leds(["a7"]);
    var index = 0;
    var step = 1;
  
    board.loop(100, () => {
      leds.off();
      leds[index].on();
      index += step;
      if (index === 0 || index === leds.length - 1) {
        step *= -1;
      }
    });
}

board.on("ready", () => {
    var led = new five.Led("b5");
    var spdt = new five.Switch("a5");
    spdt.on("close", () => {
        console.log("Switch closed");
        led.on();
        ledOnLoop();
    });

    spdt.on("open", () => {
        console.log("Switch opened");
        led.off();
    });
});