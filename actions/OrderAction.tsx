import { Dispatch } from "redux";
import { OrderService } from "../services";

const types = {
    GET_ORDER_DELIVERRING: 'GET_ORDER_DELIVERRING',
};

const getOrderDeliverring = () => {
    return (dispatch: Dispatch) => {

        OrderService.getOrderDelivering().then((response) => {
            if (response?.status) {
                dispatch({
                    type: types.GET_ORDER_DELIVERRING,
                    payload: response?.data,
                });
            } else {
                console.log(response.message);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}
export default {
    types,
    getOrderDeliverring
};