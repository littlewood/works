(function(){
	$.extend($.fn, {
		tab: function(setting) {
			var config = {
				tab: ".tab",
				hasContent:'y',
				content: ".content",
				tabOnCss: "on",
				type:"click",
				callback:function(){}
			};
			$.extend(config, setting);
			this.each(function(){
				var $tab = config.tab == "this" ? $(this) : $(config.tab, this);
				var $content = $(config.content, this); 
				
				$tab.on(config.type, "li", function(){
					var $this = $(this);
					$this.addClass(config.tabOnCss);
					if(config.hasContent == 'y') {
						$content.eq($this.index()).show().siblings(config.content).hide();
					}
					config.callback();
				});
			});
			return this;
		}
	});
})(jQuery);