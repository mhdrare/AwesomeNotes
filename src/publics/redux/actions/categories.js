import axios from 'axios'

const api = 'http://192.168.100.101:3333/categories'

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

export const deleteCategory = (id) => {
    return {
        type: 'DELETE_CATEGORIES',
        payload: axios.delete(`${api}/${id}`)
    }
}