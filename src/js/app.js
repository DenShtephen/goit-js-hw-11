import '../index.css';
import Notiflix from 'notiflix';

import { fetchImage } from './pixabay';
import { createMarkup } from './markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
  formEl: document.querySelector('.search-form'),
  myInput: document.querySelector('.search-input'),
  wraperGalery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.loadMore'),
};

const {
  formEl,
  myInput,
  wraperGalery,
  loadMore,
} = refs;

let myPage = 1;

formEl.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoadBtnClick);



const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSubmit(event) {
	event.preventDefault();
	wraperGalery.innerHTML = '';
	myPage = 1;

	const myInputValue = myInput.value
	const myValue = myInputValue.trim()

	if (!myValue) {
		loadMore.hidden = true
		return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
	}

  fetchThen(myValue);
}



async function fetchThen(value) {
  try {
    const resp = await fetchImage(value);
    const myArr = resp.data.hits; 
    const myNumber = resp.data.total; 

    if (myArr.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      ) 
	}
	
    if (myNumber > 0) {
		Notiflix.Notify.info(`Hooray! We found ${myNumber} images.`);
    }
    
        if (resp.data.totalHits <= 40) {
      loadMore.hidden = true;
        } else {
          loadMore.hidden = false;
    }

  
	
    createMarkup(myArr, wraperGalery);
    lightbox.refresh();
	
    
	
  } catch (error) {
    console.log(error);
  }
}


async function onLoadBtnClick() {
  const value = myInput.value;
  let limitAdd;
  myPage += 1;
  
  try {
    const resp = await fetchImage(value, myPage, limitAdd);
    const lastPage = Math.ceil(resp.data.totalHits / 40)
    console.log(lastPage);
    createMarkup(resp.data.hits, wraperGalery);
    lightbox.refresh();

    if (myPage === lastPage) {
      Notiflix.Notify.info('Sorry, no more images, but we love you')
      loadMore.hidden = true;
}


    if (resp.data.hits.length < limitAdd) {
      loadMore.hidden = true;
    }


  } catch (error) {
    console.log(error);
  }

}

