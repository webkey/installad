/*placeholder*/
function placeholderInit() {
	$('[placeholder]').placeholder();
}
/*placeholder end*/

/*equalHeight*/
function equalHeightInit() {
	var bonusesList = $('.vantages-list');
	bonusesList.find('.vantage-img div').equalHeight({
		amount: 5,
		useParent: true,
		parent: bonusesList,
		resize: true
	});
}
/*equalHeight end*/

/* yandexMap */
function yandexMap() {
	var mapYandex = $('.location-map');
	if (mapYandex.length) {
		mapYandex.each(function (index) {
			var obj = $(this);
			var objIndex = index + 1;
			var className = obj.attr('class');
			obj.attr('id', 'map-' + objIndex);
			var id = obj.attr('id');
			var latitude = obj.data('latitude');
			var longitude = obj.data('longitude');
			var zoom = obj.data('zoom');
			ymaps.ready(function () {
				// Create map
				var myMap = new ymaps.Map(id, {
					center: [
						$(window).width() < 943 ? +latitude-0.013 : latitude,
						$(window).width() < 943 ? longitude : +longitude+0.035
					],
					zoom: zoom,
					scrollwheel: false
				});
				var myPlacemark = new ymaps.Placemark([latitude, longitude], {
					//hintContent: 'Name',
					//help_hint: 'Name',
					//balloonContent: '<div>Name</div>',
					balloonContentHeader: "Балун метки",
					balloonContentBody: "Содержимое <em>балуна</em> метки",
					balloonContentFooter: "Подвал",
					hintContent: "Хинт метки"
				}, {
					iconImageHref: './img/pin.png',
					iconImageSize: [60, 72],
					iconImageOffset: [-28, -71]
				});
				// Add buttons and placemarks
				myMap.controls.add('zoomControl', {top: '10px', left: '10px', height: '50px'});
				myMap.geoObjects.add(myPlacemark);
			});
		});
	}
}
/* yandexMap */

/*drop navigation*/
function dropNavigation() {
	$('.header').on('click', '.btn-menu', function (e) {
		var btn = $(this);
		btn.closest('.header')
			.find('.header-options')
			.stop()
			.slideToggle(function () {
				if ($(this).is(':visible')) {
					btn.addClass('active')
						.closest('.wrapper')
						.addClass('menu-expanded');
				} else {
					btn.removeClass('active')
						.closest('.wrapper')
						.removeClass('menu-expanded');
				}
			});

		e.preventDefault();
	});
}
function clearDropNavigation() {
	var dropNav = $('.header-options'),
		btnMenu = $('.btn-menu');

	if (dropNav.is(':visible') && btnMenu.is(':visible')) {
		dropNav.slideUp(function () {
			$('.wrapper').removeClass('menu-expanded');
			btnMenu.removeClass('active');
		});
	}

	if (dropNav.attr('style') && btnMenu.is(':hidden')) {
		dropNav.attr('style', '');
	}
}
/*drop navigation end*/

/*drop language*/
var closeDropLong = function () {
	$('.lang').removeClass('lang-opened');
};
function dropLanguageInit() {
	$('.lang-active a').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.lang').toggleClass('lang-opened');
		e.stopPropagation();
	});
	$('.lang-list').on('click', function (e) {
		e.stopPropagation();
	});
	$(document).on('click', function () {
		closeDropLong();
	})
}
/*drop language end*/
/** ready/load/resize document **/

$(document).ready(function () {
	dropNavigation();
	placeholderInit();
	yandexMap();
	dropLanguageInit();
});
$(window).load(function () {
	equalHeightInit();
	$('body').addClass('load-ready');
});
$(window).on("debouncedresize", function (event) {
	clearDropNavigation();
	closeDropLong();
});