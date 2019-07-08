import { GET_TYPE_LIST, GET_TYPE_LIST_FAILURE } from '../constants/typeConstant'
import API from '../helper/api'

export const GetTypeList = () => async (dispatch, getState) => {
    try {
        const { data } = await API.get(`/oa/type/list`, {
            headers: {}
        })
        dispatch({
            type: GET_TYPE_LIST,
            payload: data
        })
    } catch (err) {
        dispatch({ type: GET_TYPE_LIST_FAILURE })
    }
}