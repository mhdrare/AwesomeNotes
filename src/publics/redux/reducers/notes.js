const initialState = {
    data: [],
    values: [],
    isLoading: false,
    isError: false
}

export default notes = (state = initialState, action) => {
    switch (action.type) {
        // GET NOTES
        case 'GET_NOTES_PENDING':
            return {
                isLoading: true,
                isError: false
            }
        case 'GET_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data.data
            }
        case 'GET_NOTES_REJECTED':
            return {
                isLoading: false,
                isError: true
            }

        // POST NOTES
        case 'POST_NOTES_PENDING':
            return {
                isLoading: true,
                isError: false
            }
        case 'POST_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload.data.data[0]]
            }
        case 'POST_NOTES_REJECTED':
            return {
                isLoading: false,
                isError: true
            }

        // PACTH NOTES
        case 'PATCH_NOTES_PENDING':
            return {
                isLoading: true,
                isError: false
            }
        case 'PATCH_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: state.data.map(data => (
                        data.id == action.payload.data.id ?
                            action.payload.data : data
                    )
                )
            }
        case 'PATCH_NOTES_REJECTED':
            return {
                isLoading: false,
                isError: true
            }

        // DELETE NOTES
        case 'DELETE_NOTES_PENDING':
            return {
                isLoading: true,
                isError: false
            }
        case 'DELETE_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'DELETE_NOTES_REJECTED':
            return {
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}