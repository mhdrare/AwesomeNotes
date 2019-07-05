const initialState = {
    data: [],
    values: [],
    page: [],
    all: [],
    isLoading: false,
    isError: false,
}

export default notes = (state = initialState, action) => {
    switch (action.type) {
        // GET NOTES
        case 'GET_NOTES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'GET_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data.data,
                page: action.payload.data,
                config: action.payload.config
            }
        case 'GET_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        // MORE NOTES
        case 'MORE_NOTES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'MORE_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [...state.data, ...action.payload.data.data]
            }
        case 'MORE_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // POST NOTES
        case 'POST_NOTES_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'POST_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [ action.payload.data.values[0], ...state.data]
            }
        case 'POST_NOTES_REJECTED':
            return {
                ...state,
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
                ...state,
                isLoading: true,
                isError: false
            }
        case 'DELETE_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(data => data.id != action.payload.data.values.id )
            }
        case 'DELETE_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}