

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
//小球半径   digit 10*7  width= 7*2*(RADIUS + 1) = 126  HEIGHT= 10*2*(RADIUS + 1) = 180
// : 10*4 width:72 height:180 
var RADIUS = 8; 
var MARGIN_TOP = 120;
var MARGIN_LEFT = 30;


// 设置截止时间，当前时间到截止时间还需要的时间
var endTime = new Date( 2016 , 12 , 6 , 24 , 0 , 0 );
// 记录距离截止时间的毫秒数
var curShowTimeSeconds = 0;
var isStart = true;
var balls = [];
const colors = [ "#33B5E5" , "#0099CC" , "#AA66CC" , "#9933CC" , "#99CC00" , "#669900" , "#FFBB33" , "FF8800" , "FF4444" , "CC0000" ];

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
			update( );
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
	
};

// update curShowTimeSeconds , excute per 50ms
/* 1 、update time  */
/* 2 、if need create balls  */
/* 3 、make the balls move*/
function update( ){
	/* update time */
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
		// check wether the hour/minute/second change, then create ball
		if( nextHours != hours ){
			addBalls( MARGIN_LEFT , MARGIN_TOP , parseInt( hours / 10 ) , cxt );
		}


		// update the seconds
		curShowTimeSeconds = nextShowTimeSeconds; 
	}

}


// getcurrent timeseconds
function getCurShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	// 将毫秒数转换为秒
	ret = Math.floor( ret / 1000 );
	return ret > 0 ? ret : 0 ;
}

/* render the graph*/
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
