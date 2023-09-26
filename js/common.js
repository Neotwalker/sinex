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

});
