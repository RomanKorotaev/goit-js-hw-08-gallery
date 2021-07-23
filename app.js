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

const galleryLinkSelector = document.querySelector('ul .gallery__link'); //

galleryContainer.addEventListener('click', openModal);

const modalWindowImg = document.querySelector('img.lightbox__image')
const modalWindowSelector = document.querySelector('div.lightbox');


/////
let currentModalImg ='';


function openModal(event) {
  event.preventDefault();
  modalWindowSelector.classList.add('is-open');

  //const modalWindowImg = document.querySelector('img.lightbox__image')
  modalWindowImg.src = event.target.dataset.source
  
  /////
  currentModalImg = event.target;
  console.log('currentModalImg =  ', currentModalImg  );
}


// --------------- Закрытие модального окна при нажатии на кнорку

const closeModalBtm = document.querySelector('button.lightbox__button')
closeModalBtm.addEventListener('click', onCloseModalBtm)

function onCloseModalBtm() {
  modalWindowSelector.classList.remove('is-open');
  modalWindowImg.src = ''; //Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
 }


 // ---------------  Закрытие модального окна по клику на div.lightbox__overlay
const closeModalOverlay = document.querySelector('div.lightbox__overlay')
 closeModalOverlay.addEventListener('click', onCloseModalBtm)


 // ---------------  Закрытие модального окна по нажатию на кнопку Esc
 window.addEventListener ('keydown', onKeyDownEsc)

function onKeyDownEsc(event) {
  event.preventDefault();
  console.log ('event.key = ',event.key)
  if (modalWindowSelector.classList.contains('is-open') && event.key === 'Escape')
    onCloseModalBtm();

}

console.log('modalWindowImg = ', modalWindowImg)

 // ---------------  Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"

  window.addEventListener ('keydown', onKeyDownArrow)

function onKeyDownArrow(event) {
  event.preventDefault();
  if (event.key === 'ArrowRight') { console.log ('event.key === ArrowRight : ', event.key) };
  if (event.key === 'ArrowLeft') { console.log('event.key === ArrowLeft : ', event.key) };
  
  if (modalWindowSelector.classList.contains('is-open')) {
    console.log('Можем пробовать стрелки ');


    //console.log(' modalWindowImg.src = event.target.dataset.source', modalWindowImg.src = event.target.dataset.source );
    //modalWindowImg = modalWindowImg.previousSibling;
   /* 
    console.log('currentModalImg = ', currentModalImg);
    console.log('currentModalImg.parentNode = ', currentModalImg.parentNode);
    console.log('currentModalImg.parentNode.parentNode = ', currentModalImg.parentNode.parentNode);
    console.log('currentModalImg.parentNode.parentNode.nextElementSibling = ', currentModalImg.parentNode.parentNode.nextElementSibling);

    //console.log('currentModalImg.parentNode.parentNode.nextElementSibling.src = ', currentModalImg.parentNode.parentNode.nextElementSibling.src);
   
    let tmpSelector = currentModalImg.parentNode.parentNode.nextElementSibling;
    let newImgInModal = tmpSelector.firstElementChild.firstElementChild;
    console.log('newImgInModal = tmpSelector.firstElementChild.firstElementChild : ', newImgInModal);
     //modalWindowImg.src = ''
    modalWindowImg.src = newImgInModal.src;

    */
    //console.log('galleryItems[0].original', galleryItems[0].original);   
    //modalWindowImg.src = galleryItems[0].original

    for (let i = 0; i < galleryItems.length-1; i += 1) {
      if (galleryItems[i].original === modalWindowImg.src) {
        currentModalImg = modalWindowImg.src;
        console.log('ССылка на оригинальную картинку найдена', currentModalImg)
        //modalWindowImg.src = galleryItems[0+1].original
      } else { console.log('ССылка на оригинальную картинку НЕ найдена') }

      
      //modalWindowImg.src =  galleryItems[i+1].original
    }
    console.log ('galleryItems[0+1].original', galleryItems[0+1].original)
    //modalWindowImg.src = `${galleryItems[0+1].original}`
modalWindowImg.src = `${galleryItems[0+1].original}`
  };
}