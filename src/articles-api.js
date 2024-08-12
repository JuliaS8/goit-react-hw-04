import axios from 'axios';

const accessKey = 'hmKueKOSC1YYczoTpEJ6RPmG-YjZzjbXeSCJdmn1NmA';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      params: {
        query: query,
        per_page: 10,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
