import { GET_COUNTRY_LIST, GET_PROVINCE_LIST, GET_CITY_LIST } from '../constants/locationConstant'
import API from '../helper/api'

export const GetCountryList = (country) => async (dispatch, getState) => {
    return API.get(`area/countries/search?q=${country}`, {
        headers: {}
        }).then(({ data }) => {
            dispatch({ type: GET_COUNTRY_LIST, payload: data })
        })
}

export const GetProvinceList = (country) => async (dispatch, getState) => {
    return API.get(`area/province/countries/${country}`, {
        headers: {}
        }).then(({ data }) => {
            dispatch({ type: GET_PROVINCE_LIST, payload: data })
        })
}

export const GetCityList = (province) => async (dispatch, getState) => {
    return API.get(`area/cities/provincies/${province}`, {
        headers: {}
        }).then(({ data }) => {
            dispatch({ type: GET_CITY_LIST, payload: data })
        })
}