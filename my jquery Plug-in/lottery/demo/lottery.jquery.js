$.fn.extend({
	lottery: function(conf) { 
		var def = { 
			item: "li",
			onClass: "on",
			speedType: "",
			overTime: 3000,
			over: function() {}
		};
		
		if (typeof conf.lotIndex === "undefined") {
			return
		}
		
		def = $.extend({}, def, conf);
		
		var $lotteryList = $(this),
			$items = $lotteryList.find(def.item);
		
		var lotteryControl = { 
			speedType: def.speedType,
			$items: $items,
			itemLen: $items.length, 
			index: 0, 
			speed: 50,
			overFlag: false,
			onClass: def.onClass,
			lotIndex: def.lotIndex,
			overTime: def.overTime,
			over: def.over,
			init: function() { 
				if (this.lotIndex >= this.itemLen) {
					this.error();
				} else { 
					this.start();
				}
			},
			start: function() {
				var self = this;
				this.play(); 
				this.setStop();
				
				switch (this.speedType) {
					case "change": 
						this.changeSpeed();
						break;
					
				}
			},
			play: function() { 
				var $items = this.$items;
				
				$items.eq(this.index - 1).removeClass(this.onClass);
				$items.eq(this.index).addClass(this.onClass);
				
				if (this.overFlag && this.index === this.lotIndex) {
					this.stop();
				} else { 
					this.next();
				}
			},
			next: function() {
				var self = this;
				this.index++;
				this.index = this.index === this.itemLen ? 0 : this.index;
				setTimeout(function() {
					self.play();
				}, this.speed);
			},
			changeSpeed: function() {
				var self = this,
					interval = 500,
					last = 600;
					
				setTimeout(function() {  
					if (!self.overFlag) { 
					
						if (self.speed >= last) {
							return;
						} else {
							self.speed = self.speed + 100;
							self.changeSpeed();
						}
					}
				}, interval);
			},
			setStop: function() {
				var self = this;
				setTimeout(function() { 
					self.overFlag = true;
				}, this.overTime);
			},
			stop: function() {
				this.over();
			},
			error: function() {
			
			}
		};
		
		lotteryControl.init( );
		
		return this;
	}
});
			