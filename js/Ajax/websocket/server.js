var io = require('socket.io');

var server = require("http").createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
}).listen(1234);

io.listen(server).on('connection', function(client){
	//client即 web socket对象
	//利用DOM0级方法：添加message事件监听程序
	client.on('message', function(msg){   //监听到信息处理
		console.log('Message Received: ', msg);  //msg即浏览器发来的数据
		client.send('服务器收到了信息:' + msg);  //向浏览器发送数据
	});
	client.on("disconnect", function(){
		//断开处理
		console.log("Server has disconnected");
	});
});