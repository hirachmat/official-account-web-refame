import { combineReducers } from 'redux'
import * as TYPE_ACTIONS from '../constants/typeConstant'
import * as CATEGORY_ACTIONS from '../constants/categoryConstant'
import * as LOCATION_ACTIONS from '../constants/locationConstant'

const types = (state = [], action) => {
    switch (action.type) {
        case TYPE_ACTIONS.GET_TYPE_LIST:
            const list = action.payload.map(item => {
                return {
                    label: item.name,
                    value: item.code
                }
            })

            return {
                ...state,
                list
            }
  
        default:
            return state
    }
}

const category = (state = [], action) => {
    switch (action.type) {
        case CATEGORY_ACTIONS.GET_CATEGORY_LIST:
            const list = action.payload.map(item => {
                return {
                    label: item.name,
                    value: item.code
                }
            })

            return {
                ...state,
                list
            }
  
        default:
            return state
    }
}

const locationState = {
    country: {
        list: []
    },
    province: {
        list: []
    },
    city: {
        list: []
    }
}

const location = (state = locationState, action) => {
    switch (action.type) {
        case LOCATION_ACTIONS.GET_COUNTRY_LIST:
            const listCountry = action.payload.map(item => {
                return {
                    label: item.nicename,
                    value: item.id,
                    phone_code: item.phonecode
                }
            })
            
            return {
                ...state,
                country: {
                    list: listCountry
                }
            }

        case LOCATION_ACTIONS.GET_PROVINCE_LIST:
            const listProvince = action.payload.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                }
            })
            
            return {
                ...state,
                province: {
                    list: listProvince
                }
            }

        case LOCATION_ACTIONS.GET_CITY_LIST:
            const listCity = action.payload.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                }
            })
            
            return {
                ...state,
                city: {
                    list: listCity
                }
            }
  
        default:
            return state
    }
}

const daftar = combineReducers({
    types,
    category,
    location
})
  
export default daftar