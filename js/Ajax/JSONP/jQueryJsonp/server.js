var http = require('http');
var urllib = require('url');

var data = {'name':'lichang', 'addr':'chengdu'};

http.createServer(function(requset, response){
	response.writeHead(200, {'Content-type':'text/plain'});

	var params = urllib.parse(requset.url, true);

	if(params.query && params.query.callback){
		var str = params.query.callback + '(' + JSON.stringify(data) + ')';  //jsonp
		response.end(str);  //将str发回客户端
	}
	else{
		response.end(JSON.stringify(data));   //普通json
	}
}).listen(1234);

console.log("Server is running at http://127.0.0.1:1234");
