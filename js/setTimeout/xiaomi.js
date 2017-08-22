/**
 * ==============================================
Question:
定义这样一个函数
function doRepeat(func, times, wait) {
}
参数分别是需要 repeat的函数， repeat的次数，每次repeat的间隔
使用方式如下
调用这个函数能返回一个新函数，比如传入的是alert，这个函数的调用就是
var repeatedFun = doRepeat(alert, 10, 5000);
调用返回的这个新函数，如: repeatFun("hellworld");
会依次alert十次 helloworld，每次间隔5秒
==============================================
 */

function doRepeat(func, times, wait){
	for(let i = 0; i < times; i++){
		setTimeout(func, wait * i);
	}
}

var repeatFun = doRepeat(function(){console.log('hello');}, 10, 5000);
// repeatFun("hellworld");