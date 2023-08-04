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

let myPage = 1:

form.addEventListener('submit', onSubmit);
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

 return await fetchThen(myValue);
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
	
    createMarkup(myArr, wraperGalery);
    lightbox.refresh();
	
	
  } catch (error) {
    console.log(error);
  }
}


async function onLoadBtnClick() {
  const value = myInput.value;
  let limitAdd = 40;
  myPage += 1;
  try {
    const resp = await fetchImage(value, myPage, limitAdd);
    createMarkup(resp.data.hits, wraperGalery);
    lightbox.refresh();

  } catch (error) {
    console.log(error);
  }

}

