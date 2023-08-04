import '../index.css';
import Notiflix from 'notiflix';

import { fetchImage } from './form';
import { createMarkup } from './markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
  form: document.querySelector('.search-form'),
  myInput: document.querySelector('.search-input'),
  wraperGalery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.loadMore'),
};

const {
  form,
  myInput,
  wraperGalery,
  loadMore,
} = refs;

let myPage = 1;


form.addEventListener('submit', onSubmit);


const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

async function onSubmit(event) {
	event.preventDefault();
	wraperGalery.innerHTML = '';
	myPage = 1;

	const myInputValue = myInput.value
	const myValue = myInputValue.trim()

	if (!myValue) {
		loadMore.hidden = true
		return
	}

 return await fetchThen(myValue);
}


loadMore.hidden = true 


async function fetchThen(value) {
  try {
    const resp = await fetchImage(value);
    const myArr = resp.data.hits; 
    const myNumber = resp.data.total; 

    if (myArr.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      ) 
	  loadMore.hidden = true // -
      return;
	}
	
    if (myNumber > 0) {
		Notiflix.Notify.info(`Hooray! We found ${myNumber} images.`);
	}
	
    createMarkup(myArr, wraperGalery);
    lightbox.refresh();
	loadMore.hidden = false 
	
	if (myArr.length < 40) {
   loadMore.hidden = true // -
   }

  } catch (error) {
    console.log(error);
  }
}


