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
				breakpoint: 580,
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

	$('.tests--stock__slider').slick({
		infinite: false,
		prevArrow: $('.tests--stock__prev'),
		nextArrow: $('.tests--stock__next'),
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1451,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 1101,
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
				breakpoint: 821,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 481,
				settings: {
					slidesToShow: 1,
					variableWidth: true,
					arrows: false,
				}
			},
		]
	});

	$('.tests--item__nav').slick({
		infinite: false,
		slidesToShow: 1,
		variableWidth: true,
		arrows: false,
	});


});

document.addEventListener('DOMContentLoaded', function() {
	var buttons = document.querySelectorAll('.tests--item__nav button');
	var blocks = document.querySelectorAll('.tests--item__info--block');

	buttons.forEach(function(button) {
		button.addEventListener('click', function() {
			// Удаляем класс active у всех кнопок
			buttons.forEach(function(btn) {
				btn.classList.remove('active');
			});
			// Добавляем класс active к нажатой кнопке
			this.classList.add('active');

			var navItem = this.getAttribute('data-nav');
			blocks.forEach(function(block) {
				block.classList.remove('active');
				if (block.getAttribute('data-navItem') === navItem) {
					block.classList.add('active');
				}
			});
		});
	});

	document.addEventListener('mouseover', function(event) {
		const icon = event.target.closest('.tests--banner__question--icon');
		const info = event.target.closest('.mini--info');

		if (icon) {
			const infoBlock = icon.parentElement.querySelector('.mini--info');
			infoBlock.classList.add('active');
		} else if (!info || !info.classList.contains('active')) {
			const activeInfo = document.querySelector('.mini--info.active');
			if (activeInfo) {
				activeInfo.classList.remove('active');
			}
		}
	});

	document.addEventListener('click', function(event) {
		const icon = event.target.closest('.tests--banner__question--icon');
		const info = event.target.closest('.mini--info');

		// Проверяем, было ли нажатие на иконку
		if (icon) {
			const infoBlock = icon.parentElement.querySelector('.mini--info');
			// Переключаем класс active
			infoBlock.classList.toggle('active');
		} else {
			// Если нажатие произошло вне иконки или info, скрываем info
			const activeInfo = document.querySelector('.mini--info.active');
			if (activeInfo && !info) {
				activeInfo.classList.remove('active');
			}
		}
	});

	const smoothHeightQuestion = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);
	
		if (!items.length) return;
	
		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);
	
			if (el.dataset.open === 'true') { // проверяем значение data-атрибута open у элемента
				button.classList.add('active') // добавляем класс 'active' в элемент
				content.style.maxHeight = `${content.scrollHeight}px` // устанавливаем высоту блока с контентом
			}
	
			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					el.dataset.open = 'true';
					button.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})
	
			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}
	
			window.addEventListener('resize', onResize);
		});
	}
	smoothHeightQuestion('.tests--faq__item', '.tests--faq__item--question', '.tests--faq__item--answer'); // вызываем основную функцию smoothHeight и передаем в качестве параметров  необходимые селекторы
	
	const testsNavMob = document.querySelector('.tests--nav__mob');

	testsNavMob.addEventListener('click', () => {
		const testsNavMenu = document.querySelector('.tests--nav__mob .tests--nav');
		testsNavMenu.classList.toggle('active');
	});

});