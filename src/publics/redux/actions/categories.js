import axios from 'axios'

const api = 'http://192.168.8.100:3333/categories'

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(api)
    }
}

export const postCategory = (data) => {
    return {
        type: 'POST_CATEGORIES',
        payload: axios.post(api, 
        	{
        		category: data.category, 
        		url_image: data.url_image
        	}
        )
    }
}