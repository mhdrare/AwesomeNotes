import { combineReducers } from 'redux'

import categories from './categories'
import notes from './notes'

const appReducer = combineReducers({
    categories,
    notes
})

export default appReducer;