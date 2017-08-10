### 使用postMessage实现不同域间的通信
###  `otherWindow.postMessage(message, targetOrigin);`
#### otherWindow: 接收信息的页面的window引用。可以是页面中iframe的contentWindow属性，window.open的返回值，通过name或下表从window.frames中取到的值
#### message:要发送的数据
#### targetOrigin:允许通信的域的url, "*"不作限制


- index.html 中包括普通元素，以及一个iframe
- childiframe.html 中定义被包含的内联框架iframe
