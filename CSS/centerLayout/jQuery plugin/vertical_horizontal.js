(function($){
	$.fn.vhAlign = function(){
		return this.each(function(i){
			//获取元素的内容高度
			var height = Math.ceil($(this).height());
			var outerheight = Math.ceil($(this).outerHeight());
			var margintop = Math.ceil(outerheight / 2);
			var width = Math.ceil($(this).width());
			var outerwidth = Math.ceil($(this).outerWidth());
			var marginleft = Math.ceil(outerwidth / 2);

			//实现元素居中效果
			$(this).css({
				"margin-top": "-" + margintop + "px",
				"top": "50%",
				"margin-left": "-" + marginleft + "px",
				"left": "50%",
				"width": width,
				"height": height,
				"position": "absolute"
			});
		});
	};
})(jQuery);