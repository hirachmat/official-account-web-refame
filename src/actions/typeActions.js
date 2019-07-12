import { GET_TYPE_LIST } from '../constants/typeConstant'
import API from '../helper/api'

export const GetTypeList = () => async (dispatch, getState) => {
    return API.get(`/oa/type/list`, {
        headers: {}
        }).then(({ data }) => {
            dispatch({ type: GET_TYPE_LIST, payload: data })
        })
}