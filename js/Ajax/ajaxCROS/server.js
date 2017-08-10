//index.html请求的服务器页面
//Server running at http://127.0.0.1:1234

var http = require('http');

http.createServer(function(request, response){
	//报头添加Access-Control-Allow-Origin字段，值为特定的URL或"*"
	//"*"表示允许所有域访问当前域
	response.setHeader("Access-Control-Allow-Origin", "*");

	//开启CROS的put/delete等方法，除get/post外
	response.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, HEAD, PATCH");

	//在response.end中设置响应内容
	response.end(request.method + " " + request.url);
}).listen(1234);

console.log("Server is running at http://127.0.0.1:1234");
