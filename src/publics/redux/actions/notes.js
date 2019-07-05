import axios from 'axios'

const api = 'http://192.168.8.100:3333/notes'

export const getNotes = (search = '', sort = 'DESC', page = 1) => {
    return {
        type: 'GET_NOTES',
        payload: axios.get(`${api}?search=${search}&sort=${sort}&page=${page}`)
    }
}

export const moreNotes = (page) => {
    return {
        type: 'MORE_NOTES',
        payload: axios.get(`${api}?page=${page}`)
    }
}

export const postNotes = (data) => {
    return {
        type: 'POST_NOTES',
        payload: axios.post(`${api}/`, 
            {
                title: data.title, 
                description: data.description, 
                category: data.category
            }
        )
    }
}

export const patchNotes = (data) => {
    return {
        type: 'PATCH_NOTES',
        payload: axios.patch(`${api}/${data.id}`, 
            {
                title: data.title,
                description: data.description,
                category: data.category
            }
        )
    }
}

export const deleteNotes = (id) => {
    return {
        type: 'DELETE_NOTES',
        payload: axios.delete(`${api}/${id}`)
    }
}