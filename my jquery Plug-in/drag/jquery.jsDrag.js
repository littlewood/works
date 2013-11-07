(function($){
	$.fn.extend({
		drag: function(setting){
			var settting = setting || {};
			var config = {
				type: "free"
			};
			config = $.extend(config, setting);
			
			this.each(function(){
				var $panel = $(this) ;
				var $drag = $panel.find(".drager");
				var coor = {};
				var pos = {};
				var flag = false;
				
				$drag.mousedown(function(evt){ 
					coor.cX = evt.clientX;
					coor.cY = evt.clientY;
					pos.left = parseInt($drag.css("left"));
					pos.top =  parseInt($drag.css("top")); 
					flag = true;
				});
				
				$(document).mousemove(function(evt){
					if (flag) {
						var maxWidth = $panel.width() - $drag.width();
						var maxHeight = $panel.height() - $drag.height(); 
						var nowLeft = (pos.left+(evt.clientX-coor.cX));
						var nowTop = (pos.top+(evt.clientY-coor.cY));
						
						pos.left = nowLeft <= 0 ? 0 : (nowLeft > maxWidth ? maxWidth : nowLeft);
						pos.top = nowTop <= 0 ? 0 : (nowTop > maxHeight ? maxHeight : nowTop);
						 
						var cssParam = {"left": pos.left, "top":pos.top};
						switch (config.type) {
							case "free" :
								break;
							case "horizontal" :
								delete cssParam["top"];
								break;
							case "vertical" :
								delete cssParam["left"];
								break;
						}
						
						$drag.css(cssParam);
						
						coor.cX = evt.clientX;
						coor.cY = evt.clientY;
					}
				}).mouseup(function(evt){ 
					flag = false;
				}); 
			});
			return this;
		}
	});
})(jQuery);