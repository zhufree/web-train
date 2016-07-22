var arr = [], count = 0;

setInterval(function() {
  arr.push(count);
  count ++;
},2000);

setInterval(function() {
  console.log(arr.pop());
  console.log(count);
}, 2000)
