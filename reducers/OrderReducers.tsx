import OrderAction from "../actions/OrderAction";



const initialState = {
    orderDeliverring: [], 
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case OrderAction.types.GET_ORDER_DELIVERRING:
      return {...state, orderDeliverring: action.payload};
    default:
      return state;
  }
};