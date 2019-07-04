const initialState = {
    data: [],
    values: [],
    isLoading: false,
    isError: false
}

export default categories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_PENDING':
            return {
                isLoading: true,
                isError: false
            }
        case 'GET_CATEGORIES_FULFILLED':
            return {
                isLoading: false,
                data: action.payload.data.values
            }
        case 'GET_CATEGORIES_REJECTED':
            return {
                isLoading: false,
                isError: true
            }
        case 'POST_CATEGORIES_PENDING':
            return {
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
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}