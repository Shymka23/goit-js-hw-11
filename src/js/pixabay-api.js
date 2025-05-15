import axios from 'axios';

// 🔑
const API_KEY = '50309673-ea2b029f8f1cb6745c8643ce8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query.trim(), // автоматично видаляємо зайві пробіли навколо запиту
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
  } catch (error) {
    console.error('HTTP Error:', error.message);
    return [];
  }
}
