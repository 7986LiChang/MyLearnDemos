### 跨域资源共享CROS的实现：主要是在服务器上实现的，添加响应头标签。客户端的实现与常规请求一致。

### 利用node.js模拟服务器，并在服务器内设置响应头部 Access-Control-Allow-Origin

### index.html中通过xhr发送ajax请求，请求服务器上数据 http://127.0.0.1:1234