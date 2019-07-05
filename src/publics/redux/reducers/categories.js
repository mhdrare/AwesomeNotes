const initialState = {
    data: [],
    values: [],
    isLoading: false,
    isError: false
}

export default categories = (state = initialState, action) => {
    switch (action.type) {
        // GET CATEGORIES
        case 'GET_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'GET_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data.values
            }
        case 'GET_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        // POST CATEGORIES
        case 'POST_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'POST_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload.data.values[0]]
            }
        case 'POST_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            
        // DELETE CATEGORIES
        case 'DELETE_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'DELETE_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(data => data.id != action.payload.data.values.id )
            }
        case 'DELETE_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}