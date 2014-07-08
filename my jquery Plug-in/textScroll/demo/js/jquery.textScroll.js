$.fn.extend({

	/**
	 * @name        textScroll  
	 * @param       {Object} conf           组件配置对象
	 * @param       {Object} conf.list
	 * @param       {String} conf.item
	 * @example     $("#notice").textScroll();
	 * */
	textScroll: function(conf) {
		var def = {
			list: "ul",
			item: "li"

		};

		def = $.extend({}, def, conf);


		this.each(function() {
			var $dom = $(this),
				$one = $dom.find(def.list),
				oneWith = $one.width(),
				cssLeftMax = $dom.width() - $one.width() * 2,
				cssLeft = 0,
				$list1 = $one.find("span"),
				$list2 = $list1.clone().appendTo($one);


			if ($one.length > 0) {

				setInterval(function() {
					if (cssLeft <= (-oneWith)) {
						$list1.after($list2);
						$one.css("left", 0);
						cssLeft = 0;
					}
					cssLeft = cssLeft - 2;

					$one.css({
						left: cssLeft
					});
				}, 100);
			}

		});
	}
});