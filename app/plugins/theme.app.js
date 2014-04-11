'use strict';

/* --------  Fix page and nav height ---------- */
function nav_page_height() {
	var setHeight = $('#root-wrapper').height();
	setHeight += 200;
	// var menuHeight = $.left_panel.height();
	var windowHeight = $(window).height() - $.navbar_height;
	//set height
	console.log(setHeight, windowHeight);
	if (setHeight > windowHeight) {// if content height exceedes actual window height and menuHeight
		$('#root-wrapper').find('#left-panel').css('min-height', setHeight + 'px');
		$.root_.css('min-height', setHeight + $.navbar_height + 'px');
	} else {
		$.left_panel.css('min-height', windowHeight + 'px');
		$.root_.css('min-height', windowHeight + 'px');
	}
}

/* --------  Add class .active to current link in navigation menu  ---------- */
function setActiveMenu() {
	$('#left-panel').find('ul').find('a').each(function(){

		if( $($(this))[0].href===String(window.location) ) {
			$(this).closest('li').addClass('active');
		} else {
			$(this).closest('li').removeClass('active');
		}

	});
}

function check_if_mobile_width() {
	if ($(window).width() < 979) {
		$.root_.addClass('mobile-view-activated');
	} else if ($.root_.hasClass('mobile-view-activated')) {
		$.root_.removeClass('mobile-view-activated');
	}
}

/* -------- This function is initialize in every  ---------- */
function pageSetUp() {
	nav_page_height();
	setActiveMenu();
	check_if_mobile_width();
}

$(document).ready(function() {

	$.root_ = $('body');
	$.left_panel = $('#left-panel');
	$.shortcut_dropdown = $('#shortcut');
	$.navbar_height = 0;

	// COLLAPSE LEFT NAV
	$('body').on('click', '.minifyme', function(e) {
		$('body').toggleClass('minified');
		e.preventDefault();
	});

	// HIDE MENU
	$('body').on('click', '.hide-menu', function(e) {
		$('body').toggleClass('hidden-menu');
		e.preventDefault();
	});

	$(window).resize(function() {
		nav_page_height();
		check_if_mobile_width();
	});

});
