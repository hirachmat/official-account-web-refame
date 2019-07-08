import { combineReducers } from 'redux'
import * as TYPE_ACTIONS from '../constants/typeConstant'

const TypeList = (state = [], action) => {
    switch (action.type) {
        case TYPE_ACTIONS.GET_TYPE_LIST:
            let typeList = action.payload.listType.map(item => {
                return {
                    label: item.name,
                    value: item.code
                }
            })
            return {
                ...state,
                typeList
            }
  
        default:
            return state
    }
}

const daftar = combineReducers({
    TypeList
})
  
export default daftar