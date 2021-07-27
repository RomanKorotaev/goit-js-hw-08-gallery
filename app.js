const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


// --------------- Сделана динамическая разметка  с использованием массива объектов и функции map

const galleryContainer = document.querySelector('.js-gallery');

 const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  const markup = galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
    
  });
  return markup.join('');
 }


// --------------- Открытие модального окна и большой оригинальной картинки

const galleryLinkSelector = document.querySelector('ul .gallery__link'); 

galleryContainer.addEventListener('click', openModal);

// Указатели на разные элементы при открытом модальном окне
const modalWindowImg = document.querySelector('img.lightbox__image')
const modalWindowSelector = document.querySelector('div.lightbox');
const closeModalOverlay = document.querySelector('div.lightbox__overlay')
const closeModalBtm = document.querySelector('button.lightbox__button')

// Функция открытия модального окна
function openModal(event) {
  event.preventDefault();
  modalWindowSelector.classList.add('is-open');
  modalWindowImg.src = event.target.dataset.source

  // Вешаем слушатели событий для обработки закрытия модального окна нажатием на кнопку Х, Esc, оверлей, выбора картинки стоелками влево,вправо
  closeModalBtm.addEventListener('click', onCloseModalBtm)
  closeModalOverlay.addEventListener('click', onCloseModalBtm);
  window.addEventListener('keydown', onKeyDownEsc);
  window.addEventListener ('keydown', onKeyDownArrow)
}


// --------------- Закрытие модального окна при нажатии на кнопку
function onCloseModalBtm() {
  modalWindowSelector.classList.remove('is-open');
  modalWindowImg.src = ''; //Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
 
  // Удаляем слушателей событий в модальном окне, при вызове функции о закрытии модального окна
  window.removeEventListener('keydown', onKeyDownEsc);
  window.removeEventListener('keydown', onKeyDownArrow);
  closeModalOverlay.removeEventListener('click', onCloseModalBtm);
  closeModalBtm.removeEventListener('click', onCloseModalBtm)
}


 // ---------------  Закрытие модального окна по нажатию на кнопку Esc

function onKeyDownEsc(event) {
  event.preventDefault();
  console.log ('event.key = ',event.key)
  if (modalWindowSelector.classList.contains('is-open') && event.key === 'Escape')
    onCloseModalBtm();

}



 // ---------------  Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"

  let indexOfNewPictureByArrow = 0;


function onKeyDownArrow(event) {
  event.preventDefault();
    
  // Проверяем открыто ли модальное окно и начинаем искать 
  //позицию(индекс) текущей картинки(ссылки на оригинальное изображение) в массиве объектов galleryItems

  if (modalWindowSelector.classList.contains('is-open')) {
    console.log('Можем пробовать стрелки ');
      for (let i = 0; i < galleryItems.length; i += 1) {
        if (galleryItems[i].original === modalWindowImg.src) {
          indexOfNewPictureByArrow = i;
          break; //прерываем поиск, когда элемент найдеи и получаем значение счётчика  indexOfNewPictureByArrow
        }         
      }
  };

// Листаем картинки, нажимая стрелку вправо
  if (event.key === 'ArrowRight') {
      if (indexOfNewPictureByArrow + 1 <= galleryItems.length-1) {
        modalWindowImg.src = galleryItems[indexOfNewPictureByArrow + 1].original;

        indexOfNewPictureByArrow += 1;
        console.log('indexOfNewPictureByArrow = ', indexOfNewPictureByArrow)
        
      } else {
        indexOfNewPictureByArrow = 0;
        modalWindowImg.src = galleryItems[indexOfNewPictureByArrow].original;
        console.log ('indexOfNewPictureByArrow = ', indexOfNewPictureByArrow)
      }
  };


  // Листаем картинки, нажимая стрелку влево
  if (event.key === 'ArrowLeft') {
      if (indexOfNewPictureByArrow - 1 >= 0 ) {
        modalWindowImg.src = galleryItems[indexOfNewPictureByArrow - 1].original;

        indexOfNewPictureByArrow -= 1;
        console.log ('indexOfNewPictureByArrow = ', indexOfNewPictureByArrow)
      } else {
        indexOfNewPictureByArrow = galleryItems.length;
        modalWindowImg.src = galleryItems[galleryItems.length-1].original;
        console.log('indexOfNewPictureByArrow = ', indexOfNewPictureByArrow);
      }
    };
}
