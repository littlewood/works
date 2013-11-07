(function($){
	$.extend($.fn, { 
		roll: function(setting) {
			var config = {
				list: "ul",
				speed: 100,
				type: "left",
				scrollType: "noline"
			};
			$.extend(config, setting);
			this.each(function() {
				var $panel = $(this);
				var $list = $(config.list, $panel); 
				var type = config.type;  
				var cssType = type; 
				var pre = type == "left" || type == "top";
				var cssParam = {};  
				var start,end;  
				var rollId = 0;  
				var listWidth = $list.width();
				var panelWidth = $panel.width(); 
				var listHeight = $list.height();
				var panelHeight = $panel.height();
 
				
				function initStyle() { 
					var len = $list.find("li").length;
					if (pre) {
						$list.append($list.html());
						cssParam[cssType] = 0;
						start = 0; 
						end = len;
					} else {
						$list.prepend($list.html());
						if (type == "right") {
							cssType = "left"; 
							cssParam[cssType] = panelWidth - listWidth*2;
						} else {
							cssType = "top"; 
							cssParam[cssType] = panelHeight - listHeight*2;
						}
						$list.css(cssType, cssParam[cssType]);
						
						start = len;
						end = len*2+1;
					}
					
				}
				
				function rolling() {
					var flag = false;
					var now = parseInt($list.css(cssType));    
					switch (type) {
						case "left" :
							flag = now <= (-listWidth);
							break;
						case "right" : 
							flag = now >= panelWidth - listWidth;
							break;
						case "top" : 
							flag = now <= (-listHeight);
							break;
						case "bottom" :  
							flag = now >= panelHeight - listHeight;
							break;
					}
			 
					if (flag) { 
						$list.find("li").slice(start,end).remove(); 
						initStyle(); 
					} 
					
					if (pre) {
						cssParam[cssType] -= 5;
					} else {
						cssParam[cssType] += 5;
					}
					   
					$list.css(cssParam);  
				}
		  
				function startRoll() {
					rollId = setInterval(rolling, config.speed);
				}
				
				function stopRoll() {
					clearTimeout(rollId);
				}
				$panel.hover(function(){ 
					stopRoll();
				} , function(){
					startRoll();
				});
				
				initStyle();
				startRoll();
			});
			
			return this;
		}
		
	});
})(jQuery);