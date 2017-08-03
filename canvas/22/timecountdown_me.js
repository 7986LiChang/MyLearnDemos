

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
//小球半径   digit 10*7  width= 7*2*(RADIUS + 1) = 126  HEIGHT= 10*2*(RADIUS + 1) = 180
// : 10*4 width:72 height:180 
var RADIUS = 8; 
var MARGIN_TOP = 120;
var MARGIN_LEFT = 30;
// 设置截止时间，当前时间到截止时间还需要的时间
var endTime = new Date( 2016 , 11 , 26 , 24 , 0 , 0 );
// 记录距离截止时间的毫秒数
var curShowTimeSeconds = 0;
var isStart = true;
var balls = [];

window.onload = function(){
	var canvas = document.getElementById("canvas");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT; 

	var context = canvas.getContext("2d");

	// get currentseconds,stay the same without refresh
	curShowTimeSeconds = getCurShowTimeSeconds();
	initialBalls( ( curShowTimeSeconds % 60 ) % 10 );

	// 绘制时钟
	setInterval( function(){
		if( isStart ){
			render( context );
			update( WINDOW_WIDTH , WINDOW_HEIGHT );
		}
		} , 50);

	document.getElementById( "start-btn" ).onclick = function( event ){
		if( isStart ){
			isStart = false;
			this.text = "继续";
		}
		else{
			isStart = true;
			this.text = "跨年倒计时";
		}
	};
	
	// render( context ); 

};

// 初始化balls[]数组
function initialBalls( num ){

	var m = 0 ; 
	for(var i = 0 ; i < digit[num].length ; i++){
		for( var j = 0 ; j <digit[num][i].length ; j++){
			if( digit[num][i][j] == 1){
				var aBall = {
					x : j * 2 * (RADIUS + 1) + (RADIUS + 1) ,
					y : i * 2 * (RADIUS + 1) + (RADIUS + 1) ,
					r : RADIUS ,
					vx : ( Math.random() * 5 + 3 ) * Math.pow( -1 , Math.floor( Math.random() * 100 ) ) , 
					// vx : -4,
					vy : 0 ,
					g : 1 ,
					color : getColor()
				};
				balls[m] = aBall;
				m++;
			}
		}
	}

}

// update curShowTimeSeconds , excute per 50ms
function update( canvasWidth , canvasHeight ){
	// 时间的变化
	var nextShowTimeSeconds = getCurShowTimeSeconds();  //获取当前时间，即下一次要显示的毫秒
	var nextHours = parseInt( nextShowTimeSeconds / 3600 );
	var nextMinutes = parseInt( ( nextShowTimeSeconds - hours * 3600 ) / 60 );
	var nextSeconds = nextShowTimeSeconds % 60;

	// cueShowTimeSeconds
	var hours = parseInt( curShowTimeSeconds / 3600 );
	var minutes = parseInt( ( curShowTimeSeconds - hours * 3600 ) / 60 );
	var seconds = curShowTimeSeconds % 60;

	// 每20ms执行一次update时，判断初始获取的时间与当前时间是否相同
	if( nextSeconds != seconds ){
		// 更新要绘制的秒数
		curShowTimeSeconds = nextShowTimeSeconds; 
		initialBalls( parseInt( seconds % 10 ) );
	}
	updateBalls( canvasWidth , canvasHeight);
}

function updateBalls( canvasWidth , canvasHeight ){

	for( var i= 0 ; i < balls.length ; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

	//边界判断
		if(balls[i].y + balls[i].r >= canvasHeight ){
			balls[i].vy = -balls[i].vy ;
			balls[i].y = canvasHeight - balls[i].r;
	}
	}
	
}

// 获取距离当前时间距离截止时间的秒数
function getCurShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	// 将毫秒数转换为秒
	ret = Math.floor( ret / 1000 );
	return ret > 0 ? ret : 0 ;
}
function render( cxt ){

	cxt.clearRect( 0 , 0 , cxt.canvas.width , cxt.canvas.height );

	// var date = new Date();
	// var hours = date.getHours();
	// var minutes = date.getMinutes();
	// var seconds = date.getSeconds();
	// 将总秒数转换为 时：分：秒

	// 设置倒计时
	var hours = parseInt( curShowTimeSeconds / 3600 );
	var minutes = parseInt( ( curShowTimeSeconds - hours * 3600 ) / 60 );
	var seconds = curShowTimeSeconds % 60;

	// 绘制点阵
	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt( hours / 10 ) , cxt ); 
	renderDigit( MARGIN_LEFT + 15 * ( RADIUS + 1 ) , MARGIN_TOP , parseInt( hours % 10 ) , cxt );
	renderDigit( MARGIN_LEFT + 30 * ( RADIUS + 1 ) , MARGIN_TOP , 10 , cxt );
	renderDigit( MARGIN_LEFT + 39 * ( RADIUS + 1 ) , MARGIN_TOP , parseInt( minutes / 10 ) , cxt ); 
	renderDigit( MARGIN_LEFT + 54 * ( RADIUS + 1 ) , MARGIN_TOP , parseInt( minutes % 10 ) , cxt );
	renderDigit( MARGIN_LEFT + 69 * ( RADIUS + 1 ) , MARGIN_TOP , 10 , cxt );
	renderDigit( MARGIN_LEFT + 78 * ( RADIUS + 1 ) , MARGIN_TOP , parseInt( seconds / 10 ) , cxt ); 
	renderDigit( MARGIN_LEFT + 93 * ( RADIUS + 1 ) , MARGIN_TOP , parseInt( seconds % 10 ) , cxt );

	// 根据当前最后一位数，生成balls数组

	renderMoveDigit( MARGIN_LEFT + 93 * ( RADIUS + 1 ) , MARGIN_TOP , cxt );

}

// 根据数字点阵绘圆
function renderDigit( x , y , num , cxt ){

	cxt.fillStyle = "rgb( 0 , 102 , 153 )";
	// cxt.fillStyle = getColor();
	// digit[num] num数字对应0/1二维矩阵
	for( var i = 0 ; i < digit[num].length ; i++ ){
		for( var j = 0 ; j < digit[num][i].length ; j++ ){
			// 为1 绘制圆
			if( digit[num][i][j] == 1 ){
				cxt.beginPath();
				cxt.arc( x + j * 2 * ( RADIUS + 1 ) + ( RADIUS + 1 ) , y + i * 2 * ( RADIUS + 1 ) + ( RADIUS + 1 ) , RADIUS , 0 , 2 * Math.PI );
				cxt.fill();
			}
		}
	}
}

// balls[]存储运动小球，绘制
function renderMoveDigit( x , y , cxt ){

	// cxt.fillStyle = getColor();
	for(var i = 0 ; i < balls.length ; i ++){
		cxt.beginPath();
		cxt.arc( x + balls[i].x , y + balls[i].y , balls[i].r , 0 , 2 * Math.PI );

		cxt.fillStyle = balls[i].color;
		cxt.fill();
	}
}

function getColor(){
	var R = Math.floor( Math.random() * 255 );
	var G = Math.floor( Math.random() * 255 );
	var B = Math.floor( Math.random() * 255 );
	return "rgb( "+R+" , "+G+" , "+B+" )";
}