import { legacy_createStore as createStore , applyMiddleware} from 'redux';
import Reducers from './reducers/Index';
import thunk from 'redux-thunk';

const Store = createStore(Reducers, applyMiddleware(thunk));

export  {Store};


