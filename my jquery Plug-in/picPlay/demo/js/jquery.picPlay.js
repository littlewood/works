(function($){
	$.fn.extend({
		jsPicPlay:function(setting){
			var setting = setting || {};
			var config = {
				type:1, //Ä¬ÈÏºáÏòÇÐ»»
				intervalTime:3000,
				speed:400
			};
			$.extend(config, setting); 
			
			this.each(function(){
				var $panel = $(this), $pic = $(".pic", $panel), $num = $(".num", $panel), $txt = $(".txt", $panel), cn="on", intervalTime = config.intervalTime, speed = config.speed, type = config.type, curIndex = 0, myTime = 0;
				var $picList = $("ul", $pic), $picItem = $("li", $pic), $numItem=$("li", $num), $txtItem = $("li", $txt);
				
				
				var picLen = $picItem.length;
				var flash = { 
					play:function(){
						++curIndex >= picLen && (curIndex=0);
						var animateParam = {};
						switch(type){
							case 2:
								animateParam = {
									top:-curIndex*$picItem.height()
								};
								break;
							default:
								animateParam = {
									left:-curIndex*$picItem.width()
								};
						}
						
						$picList.animate(animateParam, speed);
						$numItem.removeClass(cn).eq(curIndex).addClass(cn);	
						$txt.length && $txtItem.eq(curIndex).show().siblings().hide();
					},
					start:function(){
						myTime = $picItem.length && setInterval(flash.play,3000);
					},
					stop:function() {
						clearInterval(myTime);
					}
					
				};
				
				
				function setStyle(){
					switch(type){
						case 2:
							$picList.css({position:"absolute"});	
							break;
						default:
							$picList.css({position:"absolute", "width":$picItem.width()*$picItem.length});
							$picItem.css({"float":"left"});
					}
				}
				
				function setNum(){
					var ht="";
					for(var i=1; i<picLen+1; i++){
						ht+="<li>"+i+"</li>";
					}
					$num.append("<ul>"+ht+"</ul>");
					$numItem = $("li", $num);
					$numItem.first().addClass("on");
				}
				
				setStyle();
				picLen && $num.length && setNum();
				flash.start();
				$num.delegate("li", 'click', function(){
					flash.stop();
					curIndex=numItem.index($(this))-1;
					flash.play();
					flash.start();
				});
				
				
			}); 
			return this;
		}
	});
})(jQuery);