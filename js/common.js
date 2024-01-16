$(function() {

	// Получаем ссылки
	var linksArticle = document.querySelectorAll('.main--image__menu a');

	// Обходим все ссылки
	linksArticle.forEach(function(link) {
		// Получаем id целевого блока
		var targetId = link.getAttribute('href');

		// Назначаем обработчик события клика на ссылку
		link.addEventListener('click', function(e) {
			// Отменяем стандартное поведение ссылки (переход по якорю)
			e.preventDefault();

			// Получаем целевой блок по его id
			var target = document.querySelector(targetId);

			// Проверяем, что целевой блок существует
			if (target) {
				// Вычисляем позицию целевого блока относительно верха страницы
				var offsetTop = target.offsetTop;

				// Скроллируем страницу до целевого блока
				if (window.innerWidth > 992) {
					window.scrollTo({
						top: offsetTop - 140,
						behavior: 'smooth' // Плавная прокрутка
					});
				} else if (window.innerWidth <= 992 && window.innerWidth > 480){
					window.scrollTo({
						top: offsetTop - 100,
						behavior: 'smooth' // Плавная прокрутка
					});
				} else if (window.innerWidth > 390 && window.innerWidth <= 480) {
					window.scrollTo({
						top: offsetTop - 60,
						behavior: 'smooth' // Плавная прокрутка
					});
				} else if (window.innerWidth <= 390) {
					window.scrollTo({
						top: offsetTop - 100,
						behavior: 'smooth' // Плавная прокрутка
					});
				}
			}
		});
	});

	if(innerWidth > 992){
		$('.main--catalog__wrapper').slick({
			infinite: true,
			arrows: false,
			dots: false, 
			variableWidth: true,
			swipeToSlide: true 
		});
	}
	

	$('.main--slider__wrapper').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		prevArrow: $('.main--slider__prev'),
		nextArrow: $('.main--slider__next'),
		// swipe: false,
		responsive: [
			{
				breakpoint: 2049,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 993,
				settings: {
					swipe: true,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 551,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});

	$('.main--comprehensiveResearch__slider').slick({
		infinite: false,
		prevArrow: $('.main--comprehensiveResearch__prev'),
		nextArrow: $('.main--comprehensiveResearch__next'),
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 651,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
		]
	});

});
