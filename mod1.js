// function Mod() {
//     this.add = (x, y) => x + y;
// }
// module.exports = Mod;

// exports.add = (x, y) => x + y;

define(function (){
    var add = function (x, y){
        return x+y;
    };
    return {
        add: add
    };
});