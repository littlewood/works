(function($) {
	$.extend($.fn, {
		biggerView: function(conf) {  
		
			var setting = {
				picBox: ".picBox",    		// ËõÂÔÍ¼¿ò
				pic: ".pic",				// ËõÂÔÍ¼
				cus: ".cus",				// ËõÂÔÍ¼Í¼±ê
				bigerBox: ".bigerBox",		// ´óÍ¼¿ò
				bigerPic: ".bigerPic",		// ´óÍ¼
				bigSrc: "bigSrc"			// ´óÍ¼Â·¾¶ÊôÐÔ
			};
			
			$.extend(setting, conf); 
			
			this.each(function() {
			
				var BigPic = { 
					init: function() {
						var self = this; 
						$bigerPic.attr("src", bigSrc);  	 
						datas.pos = {};	
						datas.picInfo = {
							width: $pic.width(),
							height: $pic.height(),
							bigWidth: $bigerPic.width(),
							bigHeight: $bigerPic.height(),
							boxWidth: $bigerBox.width(),
							boxHeight: $bigerBox.height() || $(document).height(),
							cusWidth: $cus.width(),
							cusHeight: $cus.height()
						};
						
						self.bindEnter();
						self.bindLeave(); 
					},
					
					getPos: function(o) {
						var picOffest = $pic.offset(),
							picInfo = datas.picInfo,
							pos = {};
					
						pos = datas.pos = {
							left: o.clientX - picOffest.left,
							top: o.clientY - picOffest.top
						};
						
						if (pos.left > picInfo.width || pos.top > picInfo.height || pos.left < 0 || pos.top < 0) {  
							this.removeMove(); 
							return;
						}
						
						return {
							bigPos: { 
								left: (- pos.left * (picInfo.bigWidth / picInfo.width)) + picInfo.boxWidth / 2,
								top: (- pos.top * (picInfo.bigHeight / picInfo.height)) + picInfo.boxHeight / 2
							},
							cusPos: {
								left: pos.left - picInfo.cusWidth / 2,
								top: pos.top - picInfo.cusHeight / 2
							}
						}
					},
					
					setBigPos: function(o) { 
						var pos = this.getPos(o); 
						if (pos) { 
							$bigerPic.css(pos.bigPos);
							$cus.css(pos.cusPos);
						}
					},
					
					bindMove: function() {
						var self = this;  
						$picBox.bind("mousemove", function(o) {
							self.setBigPos(o);
						});  
					},
					
					removeMove: function() { 
						$picBox.unbind("mousemove");
					},
					
					bindEnter: function() {
						var self = this;
						$picBox.mouseenter(function() { 
							$bigerPic.add($cus).show(); 
							self.bindMove(); 
							$picBox.unbind("mouseenter");
						});
					},
					
					bindLeave: function() { 
						var self = this;
						$picBox.mouseleave(function() { 
							$bigerPic.add($cus).hide().css({left:0,top:0});  
							self.removeMove();
							self.bindEnter(); 
						});
					}
					
				};
	 
				var $this = $(this),
					datas = {},
					$picBox = $this.find(setting.picBox),
					$pic = $this.find(setting.pic),
					$cus = $this.find(setting.cus),
					$bigerPic = $this.find(setting.bigerPic),
					$bigerBox = $this.find(setting.bigerBox),
					bigSrc = $pic.attr(setting.bigSrc),
					img;		 
				
				img = new Image();
				img.src = bigSrc;
				img.onload = function() {
					BigPic.init();
				};
			});
 
		}
	})
})(jQuery);