import axios from 'axios'

const INDEX_REST_API_URL = 'https://riviarivia.herokuapp.com/index';

class IndexService {

    getCategories(){
        return axios.get(INDEX_REST_API_URL);
    }

    async postForm(userChoise) {
        return await axios.post(INDEX_REST_API_URL, userChoise);
    }
}

export default new IndexService();