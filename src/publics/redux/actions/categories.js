import axios from 'axios'

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get('http://192.168.100.101:3333/categories/')
    }
}

export const postCategory = (data) => {
    return {
        type: 'POST_CATEGORIES',
        payload: axios.post('http://192.168.100.101:3333/categories/', 
        	{
        		category: data.category, 
        		url_image: data.url_image
        	}
        )
    }
}