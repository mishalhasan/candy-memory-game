/**
 * Fetches random candy-themed photos from Unsplash API.
 * Processes and returns cleaned image data, throws on failure.
 */

import { processImages } from "../utils/helpers";

export const fetchCandyLandPhotos = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    //Clean Images Data
    let cleanData = processImages(data);

    return cleanData;
  } catch (error) {
    return error;
  }
};
