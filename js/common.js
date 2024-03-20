$(function() {

	// Получаем ссылки
	let linksArticle = document.querySelectorAll('.main--image__menu a');

	// Обходим все ссылки
	linksArticle.forEach(function(link) {
		// Получаем id целевого блока
		let targetId = link.getAttribute('href');

		// Назначаем обработчик события клика на ссылку
		link.addEventListener('click', function(e) {
			// Отменяем стандартное поведение ссылки (переход по якорю)
			e.preventDefault();

			// Получаем целевой блок по его id
			let target = document.querySelector(targetId);

			// Проверяем, что целевой блок существует
			if (target) {
				// Вычисляем позицию целевого блока относительно верха страницы
				let offsetTop = target.offsetTop;

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
					slidesToScroll: 1,
					variableWidth: true,
					arrows: false,
				}
			},
		]
	});

	let buttons = document.querySelectorAll('.tests--item__nav button');
	let blocks = document.querySelectorAll('.tests--item__info--block');
	let slickNav;
	
	if (innerWidth > 1280){
			slickNav = $('.tests--item > .tests--item__nav').slick({
					infinite: false,
					variableWidth: true,
					swipeToSlide: true,
					arrows: false,
			});
	} else {
			slickNav = $('.tests--item__mob .tests--item__nav').slick({
					infinite: false,
					variableWidth: true,
					swipeToSlide: true,
					arrows: false,
			});
	}
	
	buttons.forEach(function(button) {
    // Для десктопов
    button.addEventListener('click', function() {
        handleNavigation(this);
    });
    
    // Для мобильных устройств
    let startX, startY;
    button.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    button.addEventListener('touchend', function(event) {
        let endX = event.changedTouches[0].clientX;
        let endY = event.changedTouches[0].clientY;
        let distanceX = Math.abs(endX - startX);
        let distanceY = Math.abs(endY - startY);

        // Проверяем, было ли это действие кликом
        if (distanceX < 10 && distanceY < 10) {
            // Если это был клик, обрабатываем нажатие
            event.preventDefault(); // Предотвращаем стандартное поведение при касании
            handleNavigation(this);
        }
    });
	});

	function handleNavigation(clickedButton) {
		let currentIndex = parseInt(clickedButton.getAttribute('data-nav')) - 1;
		
		// Удаляем класс active у всех кнопок
		buttons.forEach(function(btn) {
			btn.classList.remove('active');
		});

		// Добавляем класс active к нажатой кнопке
		clickedButton.classList.add('active');

		// Перемещаем слайды, чтобы текущая кнопка оказалась в левом краю
		slickNav.slick('slickGoTo', currentIndex);

		// Удаляем класс "slick-current" у всех слайдов
		blocks.forEach(function(block) {
			block.classList.remove('active');
			block.classList.remove('slick-current');
			block.classList.remove('slick-active');
		});
		
		// Добавляем класс "slick-current" к текущему слайду
		blocks[currentIndex].classList.add('active');
		blocks[currentIndex].classList.add('slick-active');
		blocks[currentIndex].classList.add('slick-current');
	}

});

document.addEventListener('DOMContentLoaded', function() {

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

	if (testsNavMob){
		testsNavMob.addEventListener('click', () => {
			const testsNavMenu = document.querySelector('.tests--nav__mob .tests--nav');
			testsNavMenu.classList.toggle('active');
		});
	}

});