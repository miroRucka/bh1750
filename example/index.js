var BH1750 = require('../bh1750');
var light = new BH1750();

light.readLight(function(value){
    console.log("light value is: ", value, "lx");
});




