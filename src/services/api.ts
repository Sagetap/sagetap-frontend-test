import axios from "axios";

/**
 * @desc Posts rating for the artwork
 * @param param {id: number; rating: number}
 * @returns Promise
 */
export async function postRating({id, rating}: {id: number; rating: number}) {
  return axios.post('https://v0867.mocklab.io/rating', {
    id,
    rating
  });
}

/**
 * @desc Retrieves artwork data for the supplied ID
 * @param id The artwork ID
 * @returns Promise
 */
export async function getArtwork(id: number) {
  return axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
}