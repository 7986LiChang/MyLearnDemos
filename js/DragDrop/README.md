### 实现元素拖拽功能：
- EventUtil 封装跨浏览器时间处理对象
- EventTarget 自定义事件对象
- dragdrop 在其中实现元素拖拽

关键点：
**被拖拽元素使用 绝对定位absolute 或 相对定位relative**，在mousemove事件中，重新设置left 及 top值

添加mousedown/mouseup事件

修缮拖动：鼠标点击位置与元素顶端位置差异