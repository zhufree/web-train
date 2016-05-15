// var promise = new Promise(function(resolve, reject) {
// 	console.log('do sth');
// 	let status = false, val = 3;
// 	if ( status ) {
// 		resolve(val);
// 	} else {
// 		reject(status);
// 	}
// });

// promise.then(function(value) {
// 	console.log(`finished and the value is ${value}`);
// }, function(error) {
// 	console.log(`error: ${error}`);
// });
// .catch(function(error) {
// 	console.log(`error: ${error}`);
// });

// var Mod = require('./mod1');
// var mod = new Mod();
// console.log(mod.add(2, 3));

// var mod = require('./mod'); //导入该模块，mod即代表导入的模块
// console.log(mod.add(2, 3)); // 5

require(['../mod1'], function (mod1) {
	console.log(mod1.add(2, 3));
});