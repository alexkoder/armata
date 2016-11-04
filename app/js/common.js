$(document).ready(function() {

	setTimeout(function() 
	{
		$('.sect_header, .sect_header_descr').animated('fadeIn');
		$('.section1 .info_item').animated('fadeIn');
		$('.section3 .info_item').animated('fadeIn');
		$(".section8 .contact-form").animated("fadeInRight");

		animateSequence($(".section2"), '.info_item_link', 150, '30%');
		animateSequence($(".section8"), '.info_item', 200, '40%');
		function animateSequence(selector, itemSelectorStr, timeout, offsetVal) {
			
			selector.waypoint(function() {
				selector.find(itemSelectorStr).each(function(index) {
					var ths = $(this);
					setInterval(function() {
						ths.addClass("on");
					}, timeout*index);
				});
	
				this.destroy();
			}, {
				offset : offsetVal
			});
		}

	}, 50);

	$('#header-menu-toggle').on('click', function() {
		$(this).toggleClass('on');
		$('#header-main-menu').slideToggle();
		return false;
	});

	$('#footer-menu-toggle').on('click', function() {
		$(this).toggleClass('on');
		$('#footer-main-menu').slideToggle();
		$('body, html').animate({scrollTop: $('body').height()}, 'slow')
		return false;
	});

	scrollToId('#header_arrow_down_id');
	scrollToId('#header-main-menu a');
	scrollToId('#header_descr_list_id a');
	function scrollToId(selectorStr) {
		$(selectorStr).on('click', function() {
			var topOffset = $($(this).attr('href')).offset().top;
			$('body, html').animate({scrollTop: topOffset}, 'slow');
			return false;
		});
	}

	animateSequence2($(".section4"), '.info_item', 200, '40%');
	animateSequence2($(".section6"), '.info_item', 200, '40%');
	function animateSequence2(selector, itemSelectorStr, timeout, offsetVal) {
		selector.waypoint(function() {

			selector.find(itemSelectorStr).each(function(index) {
				var ths = $(this);
				setTimeout(function() {
					ths.removeClass("card-off");
				}, timeout*index);
			});
	
			this.destroy();
	
			}, {
				offset : offsetVal
		});
	}

	var waypointsvg = new Waypoint({

		element: $(".section5"),
		handler: function(dir) {
			
			if (dir === "down") {

				$(".section5 .info_item").each(function(index) {
					var ths = $(this);
					setTimeout(function() {
						var myAnimation = new DrawFillSVG({
							elementId: "s5_svg_" + index
						});
						ths.children(".info_item_content")
						.addClass("s5_opacity_on");
					}, 500*index);
				});

			};
			this.destroy();
		},
		offset: '50%'
	});

	$('#s7_slider').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navText: '',
		fluidSpeed : 600,
		autoplaySpeed : 600,
		navSpeed : 600,
		dotsSpeed : 600,
		dragEndSpeed : 600
	});

	$('#goToTop').on('click', function() {
		$('body, html').animate({scrollTop: 0}, 'slow');
	});

	$('section.homesect .button')
	.on('click', function() {
		var popupForm = $('#popup_form_id'),
			 titleName = $(this).text();
		popupForm.find('input[name=formname]').val(titleName);
		popupForm.find('.form-title').html(titleName + ':');
	})
	.magnificPopup({
		items: {
      	src: '#popup_form_id',
      	type: 'inline'
  		},
  		mainClass: 'mfp-forms'
	});

	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$(".contact-form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.magnificPopup.close();
				$("#popup_form_id").trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
