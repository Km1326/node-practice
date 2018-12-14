import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';


// const rootReducer = combineReducers({
//   authReducer,
//   postReducer
// })

const initState = {

}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return state
    case 'LOGIN_SUCCESS':
      return state
    default:
      break;
  }
}
// export default authReducer;
export default rootReducer;