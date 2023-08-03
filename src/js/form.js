const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '38630454-b1080283bd37eb37a5f5742ac';

export async function(name, page = 1, pageLimit = 40) {
    try {
        const response = await axios.get(
            `${BASE_URL}?key=${MY_KEY}&q=${name}&image_type=photo&orientation =horizontal&safesearch =true&page=${page}&per_page=${pageLimit}`
        );
        console.log(response);
    } catch (error) {
        console.log(error.response.status);
    }
}
