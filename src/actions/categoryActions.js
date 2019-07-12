import { GET_CATEGORY_LIST } from '../constants/categoryConstant'
import API from '../helper/api'

export const GetCategoryList = () => async (dispatch, getState) => {
    return API.get(`/oa/categories/list`, {
        headers: {}
        }).then(({ data }) => {
            dispatch({ type: GET_CATEGORY_LIST, payload: data })
        })
}