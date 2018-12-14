const initState = {

}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return state
  
    default:
      break;
  }
}
export default authReducer;