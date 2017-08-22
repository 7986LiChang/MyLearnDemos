var a = new Promise(
	function(resolve, reject){
		console.log(1);
		setTimeout(()=>console.log(2), 1000);
		console.log(3);
		console.log(4);
		resolve(true);  //改变promise状态，从pending->resolved，并向回调函数传参
	}
);   //创建promise实例

a.then(v => console.log(8));  //异步执行，promise状态变成resolved时的回调函数

var b = new Promise(
	function(){
		console.log(5);
		setTimeout(()=>console.log(6), 0);
	}
);

console.log(7);
