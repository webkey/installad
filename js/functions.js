/*placeholder*/
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/*placeholder end*/

/*equalHeight*/
function equalHeightInit(){
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
function yandexMap(){
	var mapYandex = $('.location-map');
	if ( mapYandex.length ) {
		mapYandex.each(function(index){
			var obj = $(this);
			var objIndex = index + 1;
			var className = obj.attr('class');
			obj.attr('id', 'map-'+objIndex);
			var id = obj.attr('id');
			var latitude = obj.data('latitude');
			var longitude = obj.data('longitude');
			var zoom = obj.data('zoom');
			ymaps.ready(function () {
				// Create map
				var myMap = new ymaps.Map(id, {
					center: [latitude, longitude],
					zoom: zoom,
					scrollwheel: false
				});
				var myPlacemark = new ymaps.Placemark([latitude, longitude],{
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
					iconImageOffset: [-19, -53]
				});
				// Add buttons and placemarks
				myMap.controls.add('zoomControl', {top: '10px', left:'10px', height: '50px'});
				myMap.geoObjects.add(myPlacemark);
			});
		});
	}
}
/* yandexMap */

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	yandexMap();
});
$(window).load(function () {
	equalHeightInit();
});