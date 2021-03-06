(function ($, window, document, undefined) {
    'use strict';
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var contentHeight = winHeight * 0.7;

    function initUI(){
	    winWidth = $(window).width();
	    winHeight = $(window).height();

	    if (winWidth <= 991){
	    	return false;
	    }

	    $(window).load(function(){

		    contentHeight = winHeight;
		    $(".main_image").css("height", contentHeight);
	    	$(".navigation ul li").css("height", contentHeight / $(".navigation ul li").length);
	    	$("#wrapper").addClass("visible");

			if( !isMobile.any() ){

				$("#wrapper").backstretch(["assets/img/bg/bg.jpg"], {duration: 6000, fade: 750});

			}

		    setTimeout(function(){
		    	$("#loading_screen").fadeOut(400);
		    }, 300);
	    });
	}

	var in_transition = false;
	var current_page = $(".navigation ul li.active a").attr("href").split("#")[1];

	$(".mobile_nav_toggle").on("click", function(){

		var nav = $(".navigation");

		if (nav.hasClass("visible")){
			nav.removeClass("visible");
		}else{
			nav.addClass("visible");
		}

	});

	function handleDesktopNav(item){

		var page_id = item.attr("href").split("#")[1];

		goto_page(page_id);

	}

	function goto_page(page_id){

		if (page_id != undefined){

			if (page_id == current_page){
				return false;
			}else{
				current_page = page_id;

				$(".navigation li.active").removeClass("active");
				$('.navigation li a[href="#'+page_id+'"]').parent().addClass("active");

				if (page_id == "home"){

					$(".landing .linner").removeClass("nomargin");
					$(".main_image").removeClass("page_active");

					$(".page_content").removeClass("active");

					setTimeout(function(){
						$(".page_content .page.active").removeClass("active");

						var home_bg_image = $(".home_bg_image").val();
						$(".main_image").css("background-image", "url("+home_bg_image+")");
					}, 300);

				}else{
					$(".landing .linner").addClass("nomargin");

					$(".main_image").addClass("page_active");
					setTimeout(function(){
						$(".page_content").addClass("active");

						if ($(".page_content .page.active").length){
							$(".page_content .page.active").removeClass("active");
							$('.page_content .page[id="'+page_id+'"]').addClass("active");


							var page_bg_image = $('.page_content .page[id="'+page_id+'"]').attr("data-bg-image");
							if (page_bg_image != undefined){
								$(".main_image").css("background-image", "url("+page_bg_image+")");
							}
						}else{
							$('.page_content .page[id="'+page_id+'"]').addClass("active");

							var page_bg_image = $('.page_content .page[id="'+page_id+'"]').attr("data-bg-image");
							if (page_bg_image != undefined){
								$(".main_image").css("background-image", "url("+page_bg_image+")");
							}
						}

					}, 50);

				}
		
				initAnimations('.page_content .page[id="'+page_id+'"]');

			}

		}
	}


	$(".scroll_to_top").on("click", function(){

		$('body').animate({scrollTop:0}, 750);

	});

	function handleMobileNav_desktop(item){

		var page_prev = item.attr("href").split("#")[0];
		var page_id = item.attr("href").split("#")[1];

		if (page_id != undefined && (page_prev == undefined || page_prev == "")){

			if (page_id != 'home'){
				$('body').animate({scrollTop:$('.page#' + page_id).offset().top}, 750);
			}else{
				$('body').animate({scrollTop:0}, 750);
			}

			$(".navigation li.active").removeClass("active");
			$('.navigation li a[href="#'+page_id+'"]').parent().addClass("active");


			return false;
		}

	}

	function handleMobileNav(){

		$(".navigation li a").on("click", function(){

			var page_prev = $(this).attr("href").split("#")[0];
			var page_id = $(this).attr("href").split("#")[1];

			if (page_id != undefined && (page_prev == undefined || page_prev == "")){

				if (page_id != 'home'){
					$('body').animate({scrollTop:$('.page#' + page_id).offset().top}, 750);
				}else{
					$('body').animate({scrollTop:0}, 750);
				}
				$(".navigation li.active").removeClass("active");
				$('.navigation li a[href="#'+page_id+'"]').parent().addClass("active");

				return false;
			}

		});


	}

	function initNavHandle(){

		$(".navigation li a").on("click", function(){

			if (in_transition == true){
				return false;
			}
			in_transition = true;

			var page_prev = $(this).attr("href").split("#")[0];
			var page_id = $(this).attr("href").split("#")[1];

			if (page_id != undefined && (page_prev == undefined || page_prev == "")){

				if (winWidth > 991){
					handleDesktopNav($(this));
				}else{
					handleMobileNav_desktop($(this));
				}

				in_transition = false;

				return false;

			}

		});

	}

	$(".goto_page").on("click", function(){

		var page_id = $(this).attr("data-page");

		if (winWidth > 991){
			goto_page(page_id);
		}else{

			if (page_id != 'home'){
				$('body').animate({scrollTop:$('.page#' + page_id).offset().top}, 750);
			}else{
				$('body').animate({scrollTop:0}, 750);
			}
			
			$(".navigation li.active").removeClass("active");
			$('.navigation li a[href="#'+page_id+'"]').parent().addClass("active");

		}

	});

	function checkPage(){

		var page_id = $(".navigation ul li.active a").attr("href").split("#")[1];

		goto_page(page_id);

	}

	$(".portfolio_filter li a").on("click", function(e){
		e.preventDefault();

		$(".portfolio_filter li a.active").removeClass("active");

		$(this).addClass("active");

		var category = $(this).attr("data-cat");

		$(".portfolio_grid .grid_item.not_active").removeClass("not_active");

		if (category != "*"){
			$(".portfolio_grid .grid_item:not(." + category + ")").addClass("not_active");
		}

		return false;

	});

	
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var OSName = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

	function checkMargin(){
		if (winWidth <= 991){
			if ($(".linner").hasClass("nomargin")){
				$(".linner").removeClass("nomargin");
			}

		}else{
			if (!$(".linner").hasClass("nomargin") && $(".linner .main_image").hasClass("page_active")){
				$(".linner").addClass("nomargin");
			}
		}
	}

	if( !isMobile.any() ){

		initUI();

		if (winWidth <= 991){
			new WOW().init();
		}

		$("body").addClass("desktop_view");

		checkMargin();

		$(window).resize(function(){
			initUI();

			if (!$("body").hasClass("desktop_view")){
				$("body").removeClass("mobile_view");
				$("body").addClass("desktop_view");
			}

			checkPage();

			checkMargin();
		});

		$(window).load(function(){

			initNavHandle();
		});

		var scrollable = $('.page');
		scrollable.on('scroll.counter_up', function(){
		    scrollable.find('.counter_up:not(.animated):in-viewport').counterUp({
				delay: 10,
				time: 1000
			}).addClass('animated');
		});

	}else{

		$("body").removeClass("desktop_view");
		$("body").addClass("mobile_view");

		$("#loading_screen").fadeOut(300);

		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();

			if (scrollTop > 150){
				$(".scroll_to_top").addClass("visible");
			}else{
				$(".scroll_to_top").removeClass("visible");
			}
		});

		new WOW().init({
			mobile: false
		});

		handleMobileNav();
	}

  	$(".single_slideshow").owlCarousel({
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
		        dots: true
	        },
	        767:{
	            items:1,
		        dots: true
	        },
	        1000:{
	            items:1,
		        dots: true
	        }
	    }
  	});

	$("body").on("click", ".contact_button", function(){
		var name = $(this).parents(".form").find(".contact_name");
		var email = $(this).parents(".form").find(".contact_email");
		var message = $(this).parents(".form").find(".contact_message");

		var val = $(this).val();

		$(this).val("Loading...");

		$.ajax({
			type: 'POST',
			url: '#',
			data: {
				'name' : name.val(),
				'email' : email.val(),
				'message' : message.val()
			},
			dataType: 'json',
			success: $.proxy(function(data) {

				if (data.error == false){
					name.val('');
					email.val('');
					message.val('');
					$(".contact_form .inputfield").removeClass("contains_error");
				}else{
					$(".contact_form .inputfield").removeClass("contains_error");
					for (var i = 0; i < data.error_fields.length; i++) {
						$(".contact_form .contact_"+data.error_fields[i]).addClass("contains_error");
					};
				}

				$(".contact_form .messages").html(data.response).addClass("visible");

				$(this).val(val);

			}, this)
		});

		return false;

	});
	
	function initAnimations(container){

		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       false,
			live:         true,
			callback:     function(box) {
			},
			scrollContainer: container
		}
		);
		wow.init();
	}

	if (jQuery().hashchange){
		jQuery(window).hashchange( function(e) {
			var hash = location.hash;
			if (hash == "")
				return false;

			var split = hash.split("#");


			var page_id = split[1];

			if ($(".page#" + page_id).length){
				if (!$("body").hasClass("mobile_view")){
					handleDesktopNav($('.navigation ul li a[href="#'+page_id+'"]'));
				}else{
					$('body').animate({scrollTop:$('.page#' + page_id).offset().top}, 750);
				}
			}

			return false;

		});

		$(window).hashchange();
	}


})(jQuery, window, document);