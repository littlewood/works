/**
 * @author littlewood
 * @email littlewoodwong@163.com
 * */
$.fn.extend({
	lottery: function(conf) { 
		var def = {
            lotIndex: 0,            // 抽中的索引
            item: "li",
            onClass: "on",
            speedStart: 50,         // 初始速度
            speedEnd: 400,          // 结束速度
            speedType: "",          // 默认匀速 可选 change: 减速
            overTime: 5000,         // 抽奖时长（最短）
            overCallback: function() {}     // 抽奖结束后的回调函数
		};
		
        if (typeof conf.lotIndex === "undefined") {
            return
        }
		
		def = $.extend({}, def, conf);
		
		var $lotteryList = $(this),
            lotteryControl = {};
		
        lotteryControl = {
            $el: $lotteryList,
            item: def.item,
            itemLen: 0,
            index: 0,
            speedType: def.speedType,
            speedStart: def.speedStart,
            speed: def.speedStart,
            speedEnd: def.speedEnd,
            a: 0,                             // 加速度
            nowTime: 0,                     // 抽奖已进行时间
            overFlag: false,                // 抽奖是否结束
            onClass: def.onClass,
            lotIndex: def.lotIndex,
            overTime: def.overTime,
            overCallback: def.overCallback,
            init: function() {
                this.$items = this.$el.find(this.item);
                this.itemLen = this.$items.length;
                this.a = (this.speedEnd - this.speed) / this.overTime;

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
                var self = this;

                setTimeout(function() {
                    self.nowTime += self.speed;

                    if (!self.overFlag) {
                        self.speed = self.speedStart + self.a * self.nowTime;

                        self.changeSpeed();
                    }
                }, this.speed);

            },
            setStop: function() {
                var self = this;

                setTimeout(function() {
                    self.overFlag = true;
                }, this.overTime);
            },
            stop: function() {
                this.overCallback();
            },
            error: function() {
                console.log("error.......");
            }
        };
		
        lotteryControl.init( );
		
        return this;
	}
});
			
