import axios from 'axios';

const API_BASE_URL = 'https://api.chucknorris.io/jokes'
/**
 *  Get Random Jokes when empty query parameter
 */
export const getRandomJoke = async ():Promise<any> => {
    try {
        const result = await axios.get(`${API_BASE_URL}/random`);
        return result;
    } catch (error) {
        return {};
    }
}
 /**
 * Get all available categories
 */
export const getAvailableCategories = async ():Promise<any> => {
    try {
        const result = await axios.get(`${API_BASE_URL}/categories`);
        return result;
    } catch (error) {
        return {};
    }
}

 /**
 * Search jokes by query
 * @param SearchQuery : string
 * 
 */

export const getQueriedJoke = async (query: String):Promise<any> => {
    try {
        const result = await axios.get(`${API_BASE_URL}/search?query=${query}`);
        return result;
    } catch (error) {
        return {};
    }
}

/**
 *  Get Random joke in Category
 * @param Category: String
 * 
 */
export const getRandomInCategory = async (category: String):Promise<any> => {
    try {
        const result = await axios.get(`${API_BASE_URL}/random?category=${category}`);
        return result;
    } catch (error) {
        return {};
    }
}