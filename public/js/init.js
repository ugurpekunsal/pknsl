// Wrap jQuery in IIFE to prevent conflicts and ensure $ is jQuery
(function($) {
	// Define throttle function inside the scope
	function throttle(fn, delay) {
		let lastCall = 0;
		return function (...args) {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return fn(...args);
		};
	}

	// Use jQuery's ready method with explicit jQuery reference
	jQuery(window).on('load', function() {
		$("h1.responsive-headline").fitText(1, {
			minFontSize: "40px",
			maxFontSize: "90px",
		});

		$(".smoothscroll").on("click", function (e) {
			e.preventDefault();
			var target = this.hash,
				$target = $(target);

			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $target.offset().top,
					},
					800,
					"swing",
					function () {
						window.location.hash = target;
					}
				);
		});

		var sections = $("section");
		var navigation_links = $("#nav-wrap a");

		sections.waypoint({
			handler: function (event, direction) {
				var active_section;

				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();

				var active_link = $(
					'#nav-wrap a[href="#' + active_section.attr("id") + '"]'
				);

				navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");
			},
			offset: "35%",
		});

		$("header").css({ height: $(window).height() });
		
		// Throttle resize handler
		$(window).on("resize", throttle(function () {
			$("header").css({ height: $(window).height() });
			$("body").css({ width: $(window).width() });
		}, 200)); // 200ms throttle

		// Throttle scroll handler
		$(window).on("scroll", throttle(function () {
			var h = $("header").height();
			var y = $(window).scrollTop();
			var nav = $("#nav-wrap");

			if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
				nav.fadeOut("fast");
			} else {
				if (y < h * 0.2) {
					nav.removeClass("opaque").fadeIn("fast");
				} else {
					nav.addClass("opaque").fadeIn("fast");
				}
			}
		}, 100)); // 100ms throttle

		$(".flexslider").flexslider({
			namespace: "flex-",
			controlsContainer: ".flex-container",
			animation: "slide",
			controlNav: true,
			directionNav: false,
			smoothHeight: false, // Changed from true to false
			slideshowSpeed: 7000,
			animationSpeed: 300, // Reduced from 600 to 300
			randomize: false,
			pauseOnHover: true, // Added to prevent unnecessary animations
		});
	});
})(jQuery); // Pass jQuery to IIFE to ensure $ refers to jQuery
