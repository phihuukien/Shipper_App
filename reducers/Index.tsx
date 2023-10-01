import {combineReducers} from 'redux';
import OrderReducers from './OrderReducers';

export default combineReducers({
  orderState: OrderReducers,
});